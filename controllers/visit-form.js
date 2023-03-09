const VisitFormModel = require("../models/visit-form");
const fs = require("fs");
const pdf = require('pdf-creator-node');

const formPromise = async (data) => {
    let html = "" ;
    console.log(data.formLanguage);
    if (data.formLanguage == 'English') {
        html = fs.readFileSync("utils/evenis-english.html", 'utf-8');
    } else if (data.formLanguage == "French") {
        html = fs.readFileSync("utils/evenis-french.html", 'utf-8');
    } else if (data.formLanguage == "Hebrew") {
        html = fs.readFileSync("utils/evenis-hebrew.html", 'utf-8');
    }
    console.log(html)
    let formDocument = {
        html: html,
        data: data,
        path: `./signed-forms/${data.firstName + "-" + data.id}.pdf`
    }
    console.log(formDocument)
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

exports.saveVisitForm = async (req, res, next) => {
    let {
        visitFormId,
        montantCommission,
        firstName,
        lastName,
        passportNumber,
        streetAddress1,
        streetAddress2,
        city,
        province,
        zip,
        country,
        phoneNumber,
        visitorEmail,
        agentEmail,
        referenceAppartment1,
        detailsReferenceAppartment1,
        referenceAppartment2,
        detailsReferenceAppartment2,
        referenceAppartment3,
        detailsReferenceAppartment3,
        visitorSignature,
        formLanguage,
        formAgent
    } = req.body
    console.log(req.body);
    let result = await VisitFormModel.findById(visitFormId);
    console.log(result);
    if (result) {
        if (visitorSignature !== '') {
            let datetoday = new Date();
            let dd = String(datetoday.getDate()).padStart(2, '0');
            let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = datetoday.getFullYear();
            let form_signed_on = dd + "-" + mm + "-" + yyyy;
            console.log(form_signed_on);
            await VisitFormModel.findByIdAndUpdate(visitFormId, {
                montantCommission: montantCommission,
                firstName: firstName,
                lastName: lastName,
                passportNumber: passportNumber,
                streetAddress1: streetAddress1,
                streetAddress2: streetAddress2,
                city: city,
                province: province,
                zip: zip,
                country: country,
                phoneNumber: phoneNumber,
                visitorEmail: visitorEmail,
                agentEmail: agentEmail,
                referenceAppartment1: referenceAppartment1,
                detailsReferenceAppartment1: detailsReferenceAppartment1,
                referenceAppartment2: referenceAppartment2,
                detailsReferenceAppartment2: detailsReferenceAppartment2,
                referenceAppartment3: referenceAppartment3,
                detailsReferenceAppartment3: detailsReferenceAppartment3,
                visitorSignature: visitorSignature,
                formSignedOn: form_signed_on,
            }).then(updateSuccess => {
                return res.status(200).json({
                    status: true,
                    message: 'Form Updated Successfully!',
                    formId: updateSuccess._id
                })
            }).catch(err => {
                console.log(err)
                return res.status(400).json({
                    status: false,
                    message: 'Form Update Failed!'
                })
            })
        }
        
    } else {

        let datetoday = new Date();
        let dd = String(datetoday.getDate()).padStart(2, '0');
        let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = datetoday.getFullYear();
        let form_generated_on = dd + "-" + mm + "-" + yyyy;

        if (visitorSignature !== "") {
            let visitForm = new VisitFormModel({
                montantCommission: montantCommission,
                firstName: firstName,
                lastName: lastName,
                passportNumber: passportNumber,
                streetAddress1: streetAddress1,
                streetAddress2: streetAddress2,
                city: city,
                province: province,
                zip: zip,
                country: country,
                phoneNumber: phoneNumber,
                visitorEmail: visitorEmail,
                agentEmail: agentEmail,
                referenceAppartment1: referenceAppartment1,
                detailsReferenceAppartment1: detailsReferenceAppartment1,
                referenceAppartment2: referenceAppartment2,
                detailsReferenceAppartment2: detailsReferenceAppartment2,
                referenceAppartment3: referenceAppartment3,
                detailsReferenceAppartment3: detailsReferenceAppartment3,
                visitorSignature: visitorSignature,
                formGeneratedOn: form_generated_on,
                formLanguage: formLanguage,
                formAgent: formAgent,
                formSignedOn: form_generated_on,
            })

            visitForm.save().then(success => {
                return res.status(200).json({
                    status: true,
                    message: 'Form Created Successfully!',
                    formId: success._id
                })
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: 'Form Create Failed!'
                })
            })
        } else {
            let visitForm = new VisitFormModel({
                montantCommission: montantCommission,
                firstName: firstName,
                lastName: lastName,
                passportNumber: passportNumber,
                streetAddress1: streetAddress1,
                streetAddress2: streetAddress2,
                city: city,
                province: province,
                zip: zip,
                country: country,
                phoneNumber: phoneNumber,
                visitorEmail: visitorEmail,
                agentEmail: agentEmail,
                referenceAppartment1: referenceAppartment1,
                detailsReferenceAppartment1: detailsReferenceAppartment1,
                referenceAppartment2: referenceAppartment2,
                detailsReferenceAppartment2: detailsReferenceAppartment2,
                referenceAppartment3: referenceAppartment3,
                detailsReferenceAppartment3: detailsReferenceAppartment3,
                visitorSignature: visitorSignature,
                formGeneratedOn: form_generated_on,
                formLanguage: formLanguage,
                formAgent: formAgent,
            })

            visitForm.save().then(success => {
                return res.status(200).json({
                    status: true,
                    message: 'Form Created Successfully!',
                    formId: success._id
                })
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: 'Form Create Failed!'
                })
            })
        }

        
    }
}

exports.getVisitorForm = async (req, res, next) => {
    const {id} = req.query;
    let result = await VisitFormModel.findById(id).populate('formAgent').exec({});
    console.log(result);
    if (result) {
        return res.status(200).json({
            status: true,
            data: result
        })
    } else {
        return res.status(400).json({
            status: false,
            data: result
        })
    }
}

exports.getSignedForms = async (req, res, next) => {
    let results = await VisitFormModel.find({ visitorSignature: {$exists: true, $ne: ""}, formSignedOn: {$exists: true, $ne: null} }).sort({ createdAt: -1 }).exec();
    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results
        })
    }
}

exports.prepareFormForDownload = async (req, res, next) => {
    const { id } = req.body;
    let result = await VisitFormModel.findById(id);
    console.log(result);
    if (result) {
        let summary = "";
        if (result.formLanguage == 'Hebrew') {
            if (result.montantCommission === 'location') {
                summary = 'b) בהשכרה: השכרה של 6 חודשים עד שנה אחת, תשלום של חודש חד פעמי.'
            } else if (result.montantCommission === 'achat') {
                summary = 'a) בקניה : % 2 אחוז מהמחיר הכולל של הנכס'
            } else {
                summary = result.montantCommission;
            }    
        } else if ( result.formLanguage == "French") {
            if (result.montantCommission === 'location') {
                summary = "b) Location: montant d'un mois de loyer H. T"
            } else if (result.montantCommission === 'achat') {
                summary = 'a) Achat: 2% H. T du montant total de la transaction'
            } else {
                summary = result.montantCommission;
            }
        } else if (result.formLanguage == "English") {
            if (result.montantCommission === 'location') {
                summary = "b) In Renting: Our office will receive one-month rent + VAT on a one year lease, and not less than one month rent on a shorter-term lease. "
            } else if (result.montantCommission === 'achat') {
                summary = 'a) In Buying / Selling: our office will receive 2% + VAT from the final sales price'
            } else {
                summary = result.montantCommission;
            }
        }
        
        let data = {
            date: result.formSignedOn == undefined ? '' : result.formSignedOn,
            name: result.firstName + " " + result.lastName,
            summary: summary == undefined ? '' : summary, 
            passportNumber: result.passportNumber == undefined ? '' : result.passportNumber,
            address: result.streetAddress1 == undefined ? '' : result.streetAddress1 + " " + result.streetAddress2 == undefined ? '' : result.streetAddress2,
            phoneNumber: result.phoneNumber == undefined ? '' : result.phoneNumber,
            email: result.visitorEmail == undefined ? '' : result.visitorEmail,
            propertyAddress1: result.referenceAppartment1 == undefined ? '' : result.referenceAppartment1,
            propertyDetails1: result.detailsReferenceAppartment1 == undefined ? '' : result.detailsReferenceAppartment1,
            propertyAddress2: result.referenceAppartment2 == undefined ? '' : result.referenceAppartment2,
            propertyDetails2: result.detailsReferenceAppartment2 == undefined ? '' : result.detailsReferenceAppartment2,
            propertyAddress3: result.referenceAppartment3 == undefined ? '' : result.referenceAppartment3,
            propertyDetails3: result.detailsReferenceAppartment3 == undefined ? '' : result.detailsReferenceAppartment3,
            signature: result.visitorSignature,
            firstName: result.firstName,
            id: result._id,
            formLanguage: result.formLanguage,
        }

        formPromise(data)
        .then(success => {
            let file = success.filename.split("\\")[success.filename.split("\\").length - 1];
            return res.status(200).json({
                status: true,
                filepath: file
            })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({
                status: false,
            })
        })
    } else {
        console.log("else");
    }
}

exports.deleteDocument = async (req, res, next) => {
    const {id} = req.query;
    await VisitFormModel.findByIdAndRemove(id).then(success => {
        return res.status(200).json({
            status: true,
            message: 'Form Deleted Successfully!'
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            status: false,
            message: 'Form Delete Failed! Please Try Again Later.'
        })
    })
}

exports.filterForms = async (req, res, next) => {
    const body = req.body;
    const query = {};

    Object.keys(body).map((bodyKey) => {
        if (bodyKey == 'name') {
            let firstName = body[bodyKey].split(" ")[0];
            let lastName = body[bodyKey].split(" ")[1];
            query['firstName'] = firstName;
            query['lastName'] = lastName;
        } else if (bodyKey == 'languages') {
            query['formLanguage'] = body[bodyKey];
        } else {
            query[bodyKey] = body[bodyKey];
        }

    })

    let results = await VisitFormModel.find(query)
    if (results.length > 0) {
        return res.status(200).json({
            status: true,
            total: results.length,
            data: results
        })
    } else {
        return res.status(400).json({
            status: false,
            total: results.length,
            data: results
        })
    }
    
}

exports.getUserSignedForms = async (req, res, next) => {
    let { agentId }  = req.query;
    let results = await VisitFormModel.find({ formAgent: agentId });
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
