'use strict'
let mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');
let user = require('./user.model')


let clientModel = new Schema({
    active: {
        type: Boolean
    },
    dateCreated: {
        type: String
    },
    idUser: {
        type: Schema.Types.ObjectId, ref: user
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

module.exports = mongoose.model('client', clientModel);