const PartnerAgency = require("../models/intergerance");
const Propriety = require("../models/propriety");

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