const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

let companyModel = new Schema({

    active: {
        type: Boolean
    },
    exp_date: {
        type: String
    },
    start_date: {
        type: String
    },
    key: {
        type: String
    },
    logo: {
        type: String
    },
    name: {
        type: String
    },
    timeZonesAllowed: [String],
    filtros: [
        {
            name: String,
            values: [String]
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: moment().format()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: moment().format()
    },

});

module.exports = mongoose.model('company', companyModel);