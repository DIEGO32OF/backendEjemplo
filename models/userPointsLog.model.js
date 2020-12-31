'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de puntos de usuarios
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const userModel = require('./user.model')
const companyModel = require('./company.model')
const activityModel = require('./activity.model')
const challengeModel = require('./challenge.model')

const userPointsLog = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: userModel
    },
    company: {
        type: Schema.Types.ObjectID,
        ref: companyModel
    },
    points: {
        type: Number,
        default: 0,
        mandatory: true
    },
    activity: {
        type: Schema.Types.ObjectID,
        ref: activityModel
    },
    challenge: {
        type: Schema.Types.ObjectID,
        ref: challengeModel
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

module.exports = mongoose.model('user_points', userPointsLog);