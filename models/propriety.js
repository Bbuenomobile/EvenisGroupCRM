const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const Propriety = new Schema({
    street: {
        type: String,
        trim: true,
    },
    building_number: {
        type: String,
        trim: true,
    },
    appartment_number: {
        type: String,
        trim: true,
    },
    city:{
        type: String,
        trim: true,
    },
    owner_name: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    rent_price: {
        type: String,
        trim: true,
    },
    sale_price: {
        type: String,
        trim: true,
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('propriety', proprietySchema, 'propriety');
