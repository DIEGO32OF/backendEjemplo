'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

let activityUserModel = require('./activityUser.model')
let companyModel = require('./company.model')
let userTestModel = require('./userTest.model')


let user = new Schema({
    wellness: {
        type: Number
    },
    tester: {
        type: Boolean
    },
    steps_goal: [{
        points: Number,
        steps: Number
    }],
    test: {
        type: String
    },
    status: {
        type: String
    },
    seven_days: {
        type: Number
    },
    rol: {
        type: String
    },
    points: {
        type: Number
    },
    picture: {
        type: String
    },
    old_week: {
        type: Number
    },
    name_first: {
        type: String
    },
    name: {
        type: String
    },
    mail: {
        type: String
    },
    last_name_first: {
        type: String
    },
    last_name: {
        type: String
    },
    lenguage: {
        type: String
    },
    gender: {
        type: String
    },
    diet: {
        type: String
    },
    create_date: {
        type: String
    },
    cell_phone: {
        type: String
    },
    born_date: {
        type: String
    },
    racha: {
        type: Number
    },
    daily: {
        type: Number
    },
    conversation: {
        type: String
    },
    conversationStatus: {
        type: Number
    },
    filtros: [
        {
            name: String,
            value: String
        }
    ],
    chat_bot_room: [{
        name: String,
        id: String
    }],
    activityUser: [{
        type: Schema.Types.ObjectId,
        ref: activityUserModel
    }],
    company: {
        type: Schema.Types.ObjectId,
        ref: companyModel
    },
    userTest: [{
        type: Schema.Types.ObjectId,
        ref: userTestModel
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
    pass: {type: String}

});

module.exports = mongoose.model('user', user);