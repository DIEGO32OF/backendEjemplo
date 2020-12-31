'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');


let mensajeModel = new Schema({

    active: {
        type: Boolean
    },
    title: {
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    order: {
        type: Number
    },
    type: {
        type: Number
    }


});

module.exports = mongoose.model('mesajewelcome', mensajeModel);