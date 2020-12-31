'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');


let conversationModel = new Schema({

    advanced: {
        type: String
    },
    basic: {
        type: String
    },
    intermediate: {
        type: String
    },
    change_habit: {
        type: Boolean
    },
    n_conversation: {
        type: String
    },
    points: {
        type: Number
    },
    notification: {
        basic: String,
        intermediate: String,
        advanced: String
    },
    pillar: {
        type: Number
    },
    next_basic: {
        type: String
    },
    next_intermediate: {
        type: String
    },
    next_advanced: {
        type: String
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

});

module.exports = mongoose.model('conversations', conversationModel);