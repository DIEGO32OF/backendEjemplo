'use strict'
var expres = require('express');


var api = expres.Router();
let fileGSCController = require('../controllers/fileGCS.controller');
const auth_md = require('./../middleware/auth.middleware')

api.post('/upload/image/', auth_md.verify, fileGSCController.uploadImage)
api.post('/upload/file/', auth_md.verify, fileGSCController.uploadFile)
api.get('/files/', auth_md.verify, fileGSCController.getAll)
api.delete('/file/:id', auth_md.verify, fileGSCController.removeById)
api.get('/file/data/:id', auth_md.verify, fileGSCController.getById)

api.get('/download/:id', fileGSCController.downloadById)
api.get('/image/:key', fileGSCController.seeImageShortUrl)
api.get('/file/:key', fileGSCController.seeImageShortUrl)

module.exports = api;