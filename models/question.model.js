'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const questionModel = new Schema({
    points: {
        type: Number
    },
    text: {
        type: String
    },
    html: {
        type: String
    },
    max: {
        type: Number
    },
    min: {
        type: Number
    },
    pillar: {
        type: Number
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

module.exports = mongoose.model('question', questionModel);