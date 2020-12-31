'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  progreso de retos
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');
let userModel = require('./user.model')
let chagengeModel = require('./challenge.model')

const challengeProgress = new Schema({
    step: {
        type: Number
    },
    achieved_points: {
        type: Number
    },
    name: {
        type: String,

    },
    user: {
        type: Schema.Types.ObjectID,
        ref: userModel
    },
    challenge: {
        type: Schema.Types.ObjectID,
        ref: chagengeModel
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

module.exports = mongoose.model('challenge_progress', challengeProgress);