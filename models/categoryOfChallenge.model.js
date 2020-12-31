'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  catalgo de de categorias de retos
 * esta es la con esta coleccion podremos identificar entre retos de tipo las diferentes categorias de retos
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const categoryOfChallengeSchema = new Schema({
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

module.exports = mongoose.model('category_of_challenge', categoryOfChallengeSchema);