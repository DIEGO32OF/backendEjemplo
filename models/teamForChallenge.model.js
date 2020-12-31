'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion los equipos para los retos
 * esta es la con esta coleccion podremos identificar los eqiupos
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

let companyModel = require('./company.model')
let userModel = require('./user.model')

const teamChallengeSchema = new Schema({
    description: {
        type: String
    },
    picture: {
        type: String
    },
    name: {
        type: String,
        mandatory: true
    },
    goals_by_team: {
        type: Number,
        mandatory: true
    },
    winner: {
        type: Schema.Types.ObjectID,
        ref: userModel
    },
    company: {
        type: Schema.Types.ObjectID,
        mandatory: true,
        ref: companyModel
    },
    participants: [{
        type: Schema.Types.ObjectID,
        ref: userModel
    }],
    accept_participants: [{
        type: Schema.Types.ObjectID,
        ref: userModel
    }],
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

module.exports = mongoose.model('team_of_challenge', teamChallengeSchema);