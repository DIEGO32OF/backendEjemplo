'use strict'
var expres = require('express');


var api = expres.Router();
let challengeController = require('../controllers/challenge.controller');

var md_Auth = require('../middleware/auth.middleware');

api.post('/challenge/', md_Auth.verify, challengeController.createElement);
api.put('/challenge/updateOrCreate/', md_Auth.verify, challengeController.updateOrCreate);
api.get('/challenge/', md_Auth.verify, challengeController.getAllElements);
api.get('/challenge/one/', md_Auth.verify, challengeController.getOneElement);
api.put('/challenge/findAndUpdate/', md_Auth.verify, challengeController.findAndUpdateElement);
api.delete('/challenge/:id', md_Auth.verify, challengeController.deleteElementById);
api.put('/challenge/:id', md_Auth.verify, challengeController.updateElementById);
api.get('/challenge/:id', md_Auth.verify, challengeController.getElementById);

module.exports = api;