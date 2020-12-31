'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  catalgo de lenguajes
 * esta es la coteccion de lenguajes para la internacionalizacion i18n
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const languageModel = new Schema({
    iso_language_code: {
        type: String,
        unique: true,
        mandatory: true
    },
    utf8_flag: {
        type: String,
    },
    description: {
        type: String
    },
    name: {
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

module.exports = mongoose.model('language', languageModel);