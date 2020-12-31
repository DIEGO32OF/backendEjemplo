'use strict'
let mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');



let habitModel = new Schema({
    active: {
        type: Boolean
    },
    dateCreated: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    level: {
        type: Number
    },
    pillar: {
        type: Number
    },
    conversation: {
        type: String
    },
    picture: {
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

module.exports = mongoose.model('habit', habitModel);