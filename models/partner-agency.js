const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const PartnerAgency = new Schema({
    agency_name: {
        type: String,
        trim: true
    },
    telephone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    agency_id: {
        type: String,
        trim: true,
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('partnerAgency', PartnerAgency, 'partnerAgency');
