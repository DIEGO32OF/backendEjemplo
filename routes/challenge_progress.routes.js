'use strict'
var expres = require('express');


var api = expres.Router();
let challengeProgressController = require('../controllers/challenge_progress.controller');

var md_Auth = require('../middleware/auth.middleware');

api.post('/progress/challenge/', md_Auth.verify, challengeProgressController.createElement);
api.put('/progress/challenge/updateOrCreate/', md_Auth.verify, challengeProgressController.updateOrCreate);
api.get('/progress/challenge/', md_Auth.verify, challengeProgressController.getAllElements);
api.get('/progress/challenge/one/', md_Auth.verify, challengeProgressController.getOneElement);
api.put('/progress/challenge/findAndUpdate/', md_Auth.verify, challengeProgressController.findAndUpdateElement);
api.delete('/progress/challenge/:id', md_Auth.verify, challengeProgressController.deleteElementById);
api.put('/progress/challenge/:id', md_Auth.verify, challengeProgressController.updateElementById);
api.get('/progress/challenge/:id', md_Auth.verify, challengeProgressController.getElementById);

module.exports = api;