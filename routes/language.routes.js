'use strict'
var expres = require('express');

var api = expres.Router();
let languageController = require('../controllers/language.controller');

var md_Auth = require('../middleware/auth.middleware');

api.post('/language/', md_Auth.verify, languageController.createElement);
api.get('/language/', md_Auth.verify, languageController.getAllElements);
api.get('/language/one/', md_Auth.verify, languageController.getOneElement);
api.get('/language/:id', md_Auth.verify, languageController.getElementById);
api.put('/language/updateOrCreate/', md_Auth.verify, languageController.createElement);
api.put('/language/findAndUpdate/', md_Auth.verify, languageController.findAndUpdateElement);
api.put('/language/:id', md_Auth.verify, languageController.updateElementById);
api.delete('/language/:id', md_Auth.verify, languageController.deleteElementById);

module.exports = api;