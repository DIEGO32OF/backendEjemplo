'use strict'
let mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let user = require('./user.model')
let habit = require('./habit.model')


let habitUserModel = new Schema({
    dateCreated: {
        type: Number
    },
    status: {
        type: String
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: user
    },
    idHabit: {
        type: Schema.Types.ObjectId,
        ref: habit
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

module.exports = mongoose.model('habit', habitUserModel);