const PartnerAgency = require("../models/intergerance");

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