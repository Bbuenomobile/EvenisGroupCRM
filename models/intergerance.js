const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const visitFormSchema = new Schema({
    formLanguage: {
        type: String,
        trime: true,
    },
    formAgent: {
        type: Schema.ObjectId,
        ref: () => User
    },
    montantCommission: {
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    passportNumber: {
        type: String,
        trim: true
    },
    streetAddress1: {
        type: String,
        trim: true
    },
    streetAddress2: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    province: {
        type: String,
        trim: true
    },
    zip: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    visitorEmail: {
        type: String,
        trim: true
    },
    agentEmail: {
        type: String,
        trim: true
    },
    referenceAppartment1: {
        type: String,
        trim: true
    },
    detailsReferenceAppartment1: {
        type: String,
        trim: true
    },
    referenceAppartment2: {
        type: String,
        trim: true
    },
    detailsReferenceAppartment2: {
        type: String,
        trim: true
    }, 
    referenceAppartment3: {
        type: String,
        trim: true
    },
    detailsReferenceAppartment3: {
        type: String,
        trim: true
    },
    visitorSignature: {
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
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('VisitForm', visitFormSchema, 'visitForm');

