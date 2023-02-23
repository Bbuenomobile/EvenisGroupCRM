const PartnerAgency = require("../models/partner-agency");
const Propriety = require("../models/propriety");
const IntergeranceForm = require("../models/intergerance");

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
        agencies, // array of objectIds
        properties, // array of objectIds
        notes, // not mandatory
        signature
    } = req.body;

    let datetoday = new Date();
    let dd = String(datetoday.getDate()).padStart(2, '0');
    let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = datetoday.getFullYear();
    let formGeneratedOn = dd + "-" + mm + "-" + yyyy;

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
                agencies: agencies, // array of objectIds
                properties: properties, // array of objectIds
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
        } else { // the agency employee side
            let datetoday = new Date();
            let dd = String(datetoday.getDate()).padStart(2, '0');
            let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = datetoday.getFullYear();
            let formSignedOn = dd + "-" + mm + "-" + yyyy; 
            const newForm = new IntergeranceForm({
                formLanguage: 'Hebrew',
                formAgent: formAgent,
                commissionType: commissionType, 
                transactionType: transactionType, // array
                agencies: agencies, // array of objectIds
                properties: properties, // array of objectIds
                notes: notes, // not mandatory
                signature: signature,
                formGeneratedOn: formGeneratedOn,
                formSignedOn: formSignedOn,
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

}