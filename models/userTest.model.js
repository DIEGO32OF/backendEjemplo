'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');


let userTestModel = new Schema({

    active: {
        type: Boolean
    },
    createDate: {
        type: String
    },
    idTest: {
        type: String
    },
    idUser: {
        type: String
    },
    isCurrent: {type: Boolean},
    result: [{
        typer: String,
        id: Number,
        porcent: Number,
        nivel: Number
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

});

module.exports = mongoose.model('userTest', userTestModel);