'use strict'
/**
 * V1.0 Diego Rivas
 * Modelo de coleccion de  catalgo de archivos de imagen que se almacenan el firebase
 *
 */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');

const userModel = require('./user.model')

const fileGSCSchema = new Schema({
    original_name: {
        type: String
    },
    new_name: {
        type: String,
        mandatory: true
    },
    extension: {
        type: String,
    },
    mimeType: {
        type: String,
    },
    public_url_firebase: {
        type: String,
    },
    uuid_firebase: {
        type: String,
    },
    firebase_path_folder: {
        type: String,
    },
    local_short_url: {
        type: String,
    },
    local_url_download: {
        type: String,
    },
    short_id: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: userModel
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

module.exports = mongoose.model('file_google_cloud_storage', fileGSCSchema);