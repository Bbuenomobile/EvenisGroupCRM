const PartnerAgency = require("../models/partner-agency");
const Propriety = require("../models/propriety");
const IntergeranceForm = require("../models/intergerance");
const fs = require("fs");
const pdf = require('pdf-creator-node');

const intergerancePromise = async (data) => {
    const html = fs.readFileSync("utils/evenis-intergerance-hebrew.html" , 'utf-8');    
    console.log(data);
    let formDocument = {
        html: html,
        data: data,
        path: `./signed-forms/${data.agency_name + "-" + data.autoId}.pdf`
    }
    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        remarkable: true,
        childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } },
        footer: {
            height: "5mm",
            contents: {
                first: 'First Page',
                default: '<span style="color: #444; text-align:right; ">Page {{page}}</span> of <span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    }
    return await pdf.create(formDocument, options)

}

exports.getAllAgencies = async (req, res, next) => {
    let results = await PartnerAgency.find({}).sort({ createAt: -1 }).exec();

    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results,
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results,
        })
    }
} 

exports.getAllProperties = async (req, res, next) => {
    let results = await Propriety.find({}).sort({ createAt: -1 }).exec();

    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results,
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results,
        })
    }
} 

exports.addNewAgency = async (req, res, next) => {
    let {
        agency_name, //mendatory
        telephone,
        email,
        agency_id,
    } = req.body;
    let result = await PartnerAgency.findOne({ agency_name: agency_name })
    if (result) {
        return res.status(400).json({
            status: false,
            message: 'Agency with same name already exists!'
        })
    } else {
        const agency = new PartnerAgency({
            agency_name: agency_name, //mendatory
            telephone: telephone,
            email: email,
            agency_id: agency_id,
        })

        agency.save().then(success => {
            return res.status(200).json({
                status: true,
                data: success,
                message: 'Agency Added Successfully to the Database!'
            })
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Agency Add Failed! Please Try Again.'
            })
        })
    }
}

exports.addNewPropriety = async (req, res, next) => {
    let {
        street,
        building_number,
        appartment_number,
        city,
        owner_name,
        type,
        rent_price,
        sale_price,
    } = req.body;
    
    const propriety = new Propriety({
        street: street,
        building_number: building_number,
        appartment_number: appartment_number,
        city: city,
        owner_name: owner_name,
        type: type,
        rent_price: rent_price,
        sale_price: sale_price,
    })

    propriety.save().then(success => {
        return res.status(200).json({
            status: true,
            data: success,
            message: 'Propriety Added Successfully!'
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            status: false,
            message: 'Propriety Add Failed! Please Try Again.'
        })
    })
}

exports.saveIntergeranceForm = async (req, res, next) => {
    let {
        formId, // blank string for first time, otherwise ID
        formLanguage, // Hebrew always
        formAgent, // agent Id
        commissionType, 
        transactionType, // array
        agency, // array of objectIds
        property, // array of objectIds
        notes, // not mandatory
        signature
    } = req.body;

    let datetoday = new Date();
    let dd = String(datetoday.getDate()).padStart(2, '0');
    let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = datetoday.getFullYear();
    let formGeneratedOn = dd + "-" + mm + "-" + yyyy;

    let autoId = 0;
    let totalForms = await IntergeranceForm.find({}).exec();
    autoId = totalForms.length + 1;

    // implementing visitor side
    
    let result = await IntergeranceForm.findById(formId);
    if (result) {
        if (signature != "") {
            let datetoday = new Date();
            let dd = String(datetoday.getDate()).padStart(2, '0');
            let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = datetoday.getFullYear();
            let formSignedOn = dd + "-" + mm + "-" + yyyy;  

            await IntergeranceForm.findByIdAndUpdate(formId, {
                commissionType: commissionType, 
                transactionType: transactionType, // array
                agency: agency,
                property: property,
                notes: notes, // not mandatory
                signature: signature,
                formSignedOn: formSignedOn
            }).then(success => {
                return res.status(200).json({
                    status: true,
                    data: success._id,
                    message: 'Form Updated Successfully!',
                })
            }).catch(err => {
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: 'Form Update Failed!'
                })
            })
        } else { 
            
        }
        // the agency employee side - its a new form
    } else {
            let datetoday = new Date();
            let dd = String(datetoday.getDate()).padStart(2, '0');
            let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = datetoday.getFullYear();
            let formSignedOn = dd + "-" + mm + "-" + yyyy; 
            const newForm = new IntergeranceForm({
                formLanguage: formLanguage,
                formAgent: formAgent,
                commissionType: commissionType, 
                transactionType: transactionType, // array
                agency: agency, // object-id
                property: property, // objectId
                notes: notes, // not mandatory
                signature: signature,
                formGeneratedOn: formGeneratedOn,
                formSignedOn: formSignedOn,
                autoId: autoId,
            })

            newForm.save().then(success => {
                return res.status(200).json({
                    status: true,
                    data: success._id,
                    message: 'Form Saved Successfully!'
                })
            }).catch(err => {
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: 'Form Save Failed! Please Try Again.'
                })
            })
    }

}

exports.getIntergeranceForm = async (req, res, next) => {
    let { formId } = req.query;
    let result = await IntergeranceForm.findById(formId).populate('formAgent').populate('agency').populate('property');
    if (result) {
        return res.status(200).json({
            status: true, 
            data: result
        })
    } else {
        return res.status(400).json({
            status: false,
            data: {}
        })
    }
}

exports.prepareIntergeranceForm = async (req, res, next) => {
    let { formId } = req.query;
    let result = await IntergeranceForm.findById(formId).populate('formAgent').populate('agency').populate('property');
    if (result) {
        let data = {
            autoId: result.autoId,
            agency_name: result.agency.agency_name,
            agency_id: result.agency.agency_id,
            telephone: result.agency.telephone,
            email: result.agency.email,
            propriety_type: result.property.type,
            sale_price: result.property.sale_price,
            rent_price: result.property.rent_price,
            appartment_number: result.property.appartment_number,
            building_number: result.property.building_number,
            street: result.property.street,
            city: result.property.city,
            commissionType: result.commissionType,
            formGeneratedOn: result.formGeneratedOn,
            signature: result.signature,
        }
        intergerancePromise(data).then(success => {
            let file = success.filename.split("\\")[success.filename.split("\\").length - 1];
            console.log(success);
            console.log(file);
            return res.status(200).json({
                status: true,
                filepath: file, 
                message: 'Intergerance Generated!'
            })
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                status: false,
                message: 'Intergerance Form Generation Failed! Please Try Again.'
            })
        })
    } else {
        return res.status(400).json({
            status: false,
            message: 'Form Generation Failed! Please Try Again.'
        })
    }
}

exports.allSignedIntergerances = async (req, res, next) => {
    let results = await IntergeranceForm.find({ signature: {$exists: true, $ne: ""} }).populate("formAgent").populate('agency').populate('property').sort({ formSignedOn: -1 }).exec({})
    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results,
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results,
        })
    }
}

exports.filterForms = async (req, res, next) => {
    let filterQuery = req.body; // { agency_name: "" , email: "" }
    let results;
    if (filterQuery.email != undefined) {
        console.log(filterQuery.email);
        results = await IntergeranceForm.find({ agency: { $ne: null } }).populate({ path: 'agency', match: { email: filterQuery.email } }).populate('property').sort({ formSignedOn: -1 }).exec({});
    } else {
        console.log(filterQuery);
        results = await IntergeranceForm.find(filterQuery).populate('agency').populate('property').sort({ formSignedOn: -1 }).exec({});
    }

    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results,
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results,
        })
    }
}