'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  catalgo de de tipos de retos
 * esta es la con esta coleccion podremos identificar entre retos de tipo individual o grupal
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const kindOfChallengeSchema = new Schema({
    description: {
        type: String
    },
    name: {
        type: String,
        mandatory: true
    },
    key: {
        type: String,
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

module.exports = mongoose.model('kind_of_challenge', kindOfChallengeSchema);