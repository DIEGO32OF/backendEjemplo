'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

let activityModel = require('./activity.model')
let questionModel = require('./question.model')

let testModel = new Schema({

    active: {
        type: Boolean
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    userTest: {
        type: Schema.Types.ObjectID,
        ref: activityModel
    },
    question: [{
        type: Schema.Types.ObjectID,
        ref: questionModel
    }],
    level: {
        type: Number
    }


});

module.exports = mongoose.model('test', testModel);