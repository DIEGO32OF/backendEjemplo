'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de que permite el uso y la administracion de  los archivos e imagenes que se almacenan en firebase GCS
 *
 */


let model_ = require('./../models/fileGCS.model')
let userModel = require('./../models/user.model')
let util = require('./../helpers/utilities.helper')
let responseCodes = require('./../helpers/respoonse_codes.helper')
let config = require('./../config/general.config')
const {Storage} = require('@google-cloud/storage');
const uuid = require('uuid-v4');
const path = require('path');
const sharp = require('sharp');
const lodash = require('lodash');
const moment = require('moment');
const axios = require('axios');
const fs = require('fs');


let functions = {};

const gcs = new Storage({
    keyFilename: path.join(__dirname, '..', 'config', 'generateConfigFB.json'),
    projectId: config.gcs_project_id
})

let bucket = gcs.bucket(config.gcs_bucket)

const get_extension = function (string) {
    let cad = string.split('.');
    let length = cad.length
    return cad[length - 1]
}
const remove_extension = function (string) {
    let ext = get_extension(string)
    return string.replace(new RegExp(ext, "g"), "");
}

const resizeAndSave = async function (value, isWebp) {
    try {
        let year = moment().format('YYYY')
        let month = moment().format('MM')
        let day = moment().format('DD')
        if (isWebp) {
            var newObject = {};
            newObject.short_id = util.randomString('7')
            newObject.original_name = remove_extension(value.name);
            newObject.extension = '.webp';
            newObject.new_name = newObject.short_id + lodash.snakeCase(remove_extension(value.name)) + '.webp';
            newObject.mimeType = 'image/webp';
            newObject.uuid_firebase = uuid()
            newObject.firebase_path_folder = '_V2_/images/webp/' + year + '/' + month + '/' + day + '/'

            var tmp_path = path.join(__dirname, '..', 'uploads', 'tmp', newObject.short_id + value.name)
            var tmp_path_save = path.join(__dirname, '..', 'uploads', 'tmp', newObject.new_name)

            await value.mv(tmp_path)
            var data_img = await sharp(tmp_path).webp({
                lossless: true
            }).toFile(tmp_path_save);

            var fileSaved = await bucket.upload(tmp_path_save, {
                destination: newObject.firebase_path_folder + newObject.new_name,
                uploadType: "media",
                metadata: {
                    contentType: newObject.mimeType,
                    metadata: {
                        firebaseStorageDownloadTokens: newObject.uuid_firebase
                    }
                }
            });

            newObject.public_url_firebase = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newObject.firebase_path_folder + newObject.new_name) + "?alt=media&token=" + newObject.uuid_firebase
            fs.unlinkSync(tmp_path)
            fs.unlinkSync(tmp_path_save)
            return newObject;
        } else if (value.mimetype.includes('png')) {
            return await resizeAndSavePNG(value)
        } else {
            return await resizeAndSaveJPG(value)
        }
    } catch (e) {
        console.error(e)
        return false;
    }


}
const saveRegularFile = async function (value) {
    try {
        let year = moment().format('YYYY')
        let month = moment().format('MM')
        let day = moment().format('DD')

        var newObject = {};
        newObject.short_id = util.randomString('11')
        newObject.original_name = remove_extension(value.name);
        newObject.extension = '.' + get_extension(value.name);
        newObject.new_name = newObject.short_id + lodash.snakeCase(remove_extension(value.name)) + newObject.extension;
        newObject.mimeType = value.mimetype;
        newObject.uuid_firebase = uuid()
        newObject.firebase_path_folder = '_V2_/files/' + get_extension(value.name) + '/' + year + '/' + month + '/' + day + '/'

        var tmp_path = path.join(__dirname, '..', 'uploads', 'tmp', newObject.short_id + value.name)
        var tmp_path_save = tmp_path

        await value.mv(tmp_path)


        var fileSaved = await bucket.upload(tmp_path_save, {
            destination: newObject.firebase_path_folder + newObject.new_name,
            uploadType: "file",
            metadata: {
                contentType: newObject.mimeType,
                metadata: {
                    firebaseStorageDownloadTokens: newObject.uuid_firebase
                }
            }
        });

        newObject.public_url_firebase = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newObject.firebase_path_folder + newObject.new_name) + "?alt=media&token=" + newObject.uuid_firebase
        fs.unlinkSync(tmp_path)

        return newObject;

    } catch (e) {
        console.error(e)
        return false;
    }


}
const resizeAndSaveJPG = async function (value) {

    let year = moment().format('YYYY')
    let month = moment().format('MM')
    let day = moment().format('DD')

    try {
        var newObject = {};
        newObject.short_id = util.randomString('7')
        newObject.original_name = remove_extension(value.name);
        newObject.extension = '.jpg';
        newObject.new_name = newObject.short_id + lodash.snakeCase(remove_extension(value.name)) + '.jpg';
        newObject.mimeType = 'image/jpeg';
        newObject.uuid_firebase = uuid()
        newObject.firebase_path_folder = '_V2_/images/jpg/' + year + '/' + month + '/' + day + '/'

        var tmp_path = path.join(__dirname, '..', 'uploads', 'tmp', newObject.short_id + value.name)
        var tmp_path_save = path.join(__dirname, '..', 'uploads', 'tmp', newObject.new_name)

        await value.mv(tmp_path)
        var data_img = await sharp(tmp_path).jpeg({
            quality: 70,
        }).toFile(tmp_path_save);

        var fileSaved = await bucket.upload(tmp_path_save, {
            destination: newObject.firebase_path_folder + newObject.new_name,
            uploadType: "media",
            metadata: {
                contentType: newObject.mimeType,
                metadata: {
                    firebaseStorageDownloadTokens: newObject.uuid_firebase
                }
            }
        });

        newObject.public_url_firebase = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newObject.firebase_path_folder + newObject.new_name) + "?alt=media&token=" + newObject.uuid_firebase
        fs.unlinkSync(tmp_path)
        fs.unlinkSync(tmp_path_save)
        return newObject;
    } catch (e) {
        console.error(e)
        return false;
    }

}

const resizeAndSavePNG = async function (value) {
    let year = moment().format('YYYY')
    let month = moment().format('MM')
    let day = moment().format('DD')

    try {
        var newObject = {};
        newObject.short_id = util.randomString('7')
        newObject.original_name = remove_extension(value.name);
        newObject.extension = '.' + get_extension(value.name);
        newObject.new_name = newObject.short_id + lodash.snakeCase(remove_extension(value.name)) + newObject.extension;
        newObject.mimeType = value.mimetype;
        newObject.uuid_firebase = uuid()
        newObject.firebase_path_folder = '_V2_/images/png/' + year + '/' + month + '/' + day + '/'

        var tmp_path = path.join(__dirname, '..', 'uploads', 'tmp', newObject.short_id + '_' + value.name)
        var tmp_path_save = tmp_path;

        await value.mv(tmp_path)

        var fileSaved = await bucket.upload(tmp_path_save, {
            destination: newObject.firebase_path_folder + newObject.new_name,
            uploadType: "media",
            metadata: {
                contentType: newObject.mimeType,
                metadata: {
                    firebaseStorageDownloadTokens: newObject.uuid_firebase
                }
            }
        });
        newObject.public_url_firebase = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(newObject.firebase_path_folder + newObject.new_name) + "?alt=media&token=" + newObject.uuid_firebase
        fs.unlinkSync(tmp_path)

        return newObject;
    } catch (e) {
        console.error(e)
        return false;
    }
}

functions.uploadImage = async function (req, res) {
    if (!req.files) {
        let resp = await responseCodes.getErrorByCode(435);
        res.status(435).json(resp);
        return false;
    }

    let {webp} = req.query;


    var fullUrlImage = req.protocol + '://' + req.get('host') + '/api/image/';
    var fullUrlDownload = req.protocol + '://' + req.get('host') + '/api/download/';

    var data_response = []
    try {
        for (var [key, value] of Object.entries(req.files)) {
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    var item = value[i];
                    var ob = await resizeAndSave(item, webp)
                    ob.local_short_url = fullUrlImage + ob.short_id;

                    var to_save = new model_(ob);
                    to_save = await to_save.save()
                    to_save.local_url_download = fullUrlDownload + to_save._id;
                    if (req.user && req.user.idUser) {
                        to_save.owner = req.user.idUser
                    }
                    to_save = await to_save.save()
                    data_response.push(to_save)

                }

            } else {
                var ob = await resizeAndSave(value, webp)
                ob.local_short_url = fullUrlImage + ob.short_id;

                var to_save = new model_(ob);
                to_save = await to_save.save()
                to_save.local_url_download = fullUrlDownload + to_save._id;
                if (req.user && req.user.idUser) {
                    to_save.owner = req.user.idUser
                }
                to_save = await to_save.save()
                data_response.push(to_save)
            }
        }
        let resp = await responseCodes.getErrorByCode(200);
        resp.data = data_response;
        res.status(200).json(resp);
    } catch (e) {
        console.error(e)
        let resp = await responseCodes.getErrorByCode(500);
        resp.error = e
        res.status(500).json(resp);
    }
}

functions.uploadFile = async function (req, res) {
    if (!req.files) {
        let resp = await responseCodes.getErrorByCode(435);
        res.status(435).json(resp);
        return false;
    }


    var fullUrlImage = req.protocol + '://' + req.get('host') + '/api/file/';
    var fullUrlDownload = req.protocol + '://' + req.get('host') + '/api/download/';

    var data_response = []
    try {
        for (var [key, value] of Object.entries(req.files)) {
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    var item = value[i];
                    var ob = await saveRegularFile(item)
                    ob.local_short_url = fullUrlImage + ob.short_id;

                    var to_save = new model_(ob);
                    to_save = await to_save.save()
                    to_save.local_url_download = fullUrlDownload + to_save._id;
                    if (req.user && req.user.idUser) {
                        to_save.owner = req.user.idUser
                    }
                    to_save = await to_save.save()
                    data_response.push(to_save)

                }

            } else {
                var ob = await saveRegularFile(value)
                ob.local_short_url = fullUrlImage + ob.short_id;

                var to_save = new model_(ob);
                to_save = await to_save.save()
                to_save.local_url_download = fullUrlDownload + to_save._id;
                if (req.user && req.user.idUser) {
                    to_save.owner = req.user.idUser
                }
                to_save = await to_save.save()

                data_response.push(to_save)
            }
        }
        let resp = await responseCodes.getErrorByCode(200);
        resp.data = data_response;
        res.status(200).json(resp);
    } catch (e) {
        console.error(e)
        let resp = await responseCodes.getErrorByCode(500);
        resp.error = e
        res.status(500).json(resp);
    }

}

functions.removeById = function (req, res) {


}

functions.getById = async function (req, res) {
    let {id} = req.params;
    if (!id) {
        let response = responseCodes.getErrorByCode(404)
        res.status(404).json(response)
        return false
    }
    try {
        let file = await model_.findById(id).populate({path: 'owner', model: userModel}).exec();
        if (!file) {
            let response = responseCodes.getErrorByCode(404)
            res.status(404).json(response)
            return false
        }
        let response = responseCodes.getErrorByCode(200)
        response.data = file
        res.status(200).json(response)
        return false

    } catch (e) {
        console.error(e)
        let response = responseCodes.getErrorByCode(500)
        response.error = e
        res.status(500).json(response)
        return false
    }
}
functions.getAll = async function (req, res) {
    try {
        let file = await model_.find().populate({path: 'owner', model: userModel}).exec();
        if (!file) {
            let response = responseCodes.getErrorByCode(404)
            res.status(404).json(response)
            return false
        }
        let response = responseCodes.getErrorByCode(200)
        response.data = file
        res.status(200).json(response)
        return false

    } catch (e) {
        console.error(e)
        let response = responseCodes.getErrorByCode(500)
        response.error = e
        res.status(500).json(response)
        return false
    }
}

functions.downloadById = async function (req, res) {

    let {id} = req.params;
    if (!id) {
        let response = responseCodes.getErrorByCode(404)
        res.status(404).json(response)
        return false
    }
    try {
        let file = await model_.findById(id).populate({path: 'owner', model: userModel}).exec();
        if (!file) {
            let response = responseCodes.getErrorByCode(404)
            res.status(404).json(response)
            return false
        }

        var tmp_path_save = path.join(__dirname, '..', 'uploads', 'tmp', file.short_id + '_' + file.new_name)

        let respons = await axios({
            method: "get",
            url: file.public_url_firebase,
            responseType: "stream"
        })


        let fileSaveResolver = fs.createWriteStream(tmp_path_save)

        respons.data.pipe(fileSaveResolver);

        fileSaveResolver.on('finish', function () {
            res.status(200).download(tmp_path_save, file.original_name + file.extension)
            setTimeout(function () {
                fs.unlinkSync(tmp_path_save)
            }, 1000 * 60 * 3)
        })

        fileSaveResolver.on('error', function (e) {
            console.error(e)
            let response = responseCodes.getErrorByCode(500)
            response.error = e
            res.status(500).json(response)
            return false
        })


        return false

    } catch (e) {
        console.error(e)
        let response = responseCodes.getErrorByCode(500)
        response.error = e
        res.status(500).json(response)
        return false
    }

}
functions.seeImageShortUrl = async function (req, res) {
    let {key} = req.params;
    if (!key) {
        let response = responseCodes.getErrorByCode(404)
        res.status(404).json(response)
        return false
    }
    try {
        let file = await model_.findOne({short_id: key});
        if (!file) {
            let response = responseCodes.getErrorByCode(404)
            res.status(404).json(response)
            return false
        }

        res.redirect(file.public_url_firebase)

    } catch (e) {
        console.error(e)
        let response = responseCodes.getErrorByCode(500)
        response.error = e
        res.status(500).json(response)
        return false
    }
}

module.exports = functions;