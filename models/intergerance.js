const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const PartnerAgency = require("./partner-agency");
const Propriety = require("./propriety");

const IntergeranceSchema = new Schema({
    formLanguage: {
        type: String,
        trime: true,
    },
    formAgent: {
        type: Schema.ObjectId,
        ref: () => User
    },
    commissionType: {
        type: String,
        trim: true,
    },
    transactionType: [{
        type: String,
        trim: true
    }],
    agency: {
        type: Schema.ObjectId,
        ref: () => PartnerAgency
    },
    property: {
        type: Schema.ObjectId,
        ref: () => Propriety
    },
    notes: {
        type: String,
        trim: true
    },
    formGeneratedOn: {
        type: String, 
        trim: true
    },
    formSignedOn: {
        type: String, 
        trim: true
    },
    signature: {
        type: String,
        trim: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('IntergeranceForm', IntergeranceSchema, 'intergeranceForm');
