'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const linesModel = new Schema({
    placeholder: {
        type: String
    },
    value: {
        type: String
    },
    uid: {
        type: String
    },
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
})

module.exports = mongoose.model('lines', linesModel);