'use strict'
var expres = require('express');


var api = expres.Router();
let teamForChallengeController = require('../controllers/teamForChallenge.controller');

var md_Auth = require('../middleware/auth.middleware');

api.post('/team/accept/:teamID/:userID', md_Auth.verify, teamForChallengeController.acceptTeam);
api.post('/team/', md_Auth.verify, teamForChallengeController.createElement);
api.put('/team/updateOrCreate/', md_Auth.verify, teamForChallengeController.updateOrCreate);
api.get('/team/', md_Auth.verify, teamForChallengeController.getAllElements);
api.get('/team/one/', md_Auth.verify, teamForChallengeController.getOneElement);
api.put('/team/findAndUpdate/', md_Auth.verify, teamForChallengeController.findAndUpdateElement);

api.delete('/team/:id', md_Auth.verify, teamForChallengeController.deleteElementById);
api.put('/team/:id', md_Auth.verify, teamForChallengeController.updateElementById);
api.get('/team/:id', md_Auth.verify, teamForChallengeController.getElementById);

module.exports = api;