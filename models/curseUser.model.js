'use strict'
let mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let activities = require('./activity.model')

let curseUserModel = new Schema({


    idUser: {
        type: String
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: activities
    },
    dateCreated: {
        type: String
    },
    isFavorite: {
        type: Boolean
    },
    userAnswer: {
        type: String
    }, createdAt: {
        type: Date,
        required: true,
        default: moment().format()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: moment().format()
    },

});

module.exports = mongoose.model('curseuser', curseUserModel);