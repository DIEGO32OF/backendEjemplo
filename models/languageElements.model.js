'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');
let language = require('./language.model')

const languageElementsModel = new Schema({
    language: {
        type: Schema.Types.ObjectId,
        ref: language
    },
    reference: {
        type: String,
        mandatory: true,

    },
    text: {
        type: String,
        mandatory: true
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

module.exports = mongoose.model('language_element', languageElementsModel);