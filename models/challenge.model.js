'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  catalgo  de retos
 * aqui se guardaran los retos
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

let kindOfChallengeModel = require('./kindOfChallenge.model')
let categoryOfChallengeModel = require('./categoryOfChallenge.model')
let companyModel = require('./company.model')
let userModel = require('./user.model')
let teamModel = require('./teamForChallenge.model')

const challengeSchema = new Schema({
    description: {
        type: String
    },
    picture: {
        type: String
    },
    title: {
        type: String,
        mandatory: true
    },
    kind: {
        type: Schema.Types.ObjectID,
        mandatory: true,
        ref: kindOfChallengeModel
    },
    category: {
        type: Schema.Types.ObjectID,
        mandatory: true,
        ref: categoryOfChallengeModel
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
    winner: {
        type: Schema.Types.ObjectID,
        ref: userModel
    },
    teams: [{
        type: Schema.Types.ObjectID,
        ref: teamModel
    }],
    points: {
        type: Number,
        mandatory: true
    },
    active: {
        type: Boolean,
        mandatory: true,
        default: true
    },
    start_date: {
        type: Date,
        required: true,
        default: moment().format()
    },
    end_date: {
        type: Date,
        required: true,
        default: moment().format()
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

module.exports = mongoose.model('challenge', challengeSchema);