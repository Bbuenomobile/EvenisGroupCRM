const VisitFormModel = require("../models/visit-form");


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
    } = req.body

    let result = await VisitFormModel.findById(visitFormId);

    if (result) {
        if (visitorSignature !== '') {
            let datetoday = new Date();
            let dd = String(datetoday.getDate()).padStart(2, '0');
            let mm = String(datetoday.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = datetoday.getFullYear();
            let form_signed_on = dd + "-" + mm + "-" + yyyy;
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

exports.getVisitorForm = async (req, res, next) => {
    const {id} = req.query;
    let result = await VisitFormModel.findById(id);
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