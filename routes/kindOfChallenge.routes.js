'use strict'
var expres = require('express');


var api = expres.Router();
let kindOfChallengeController = require('../controllers/kindOfChallenge.controller');
var md_Auth = require('../middleware/auth.middleware');

api.post('/kind/challenge/', md_Auth.verify, kindOfChallengeController.createElement);
api.put('/kind/challenge/updateOrCreate/', md_Auth.verify, kindOfChallengeController.updateOrCreate);
api.get('/kind/challenge/', md_Auth.verify, kindOfChallengeController.getAllElements);
api.get('/kind/challenge/one/', md_Auth.verify, kindOfChallengeController.getOneElement);
api.put('/kind/challenge/findAndUpdate/', md_Auth.verify, kindOfChallengeController.findAndUpdateElement);
api.delete('/kind/challenge/:id', md_Auth.verify, kindOfChallengeController.deleteElementById);
api.put('/kind/challenge/:id', md_Auth.verify, kindOfChallengeController.updateElementById);
api.get('/kind/challenge/:id', md_Auth.verify, kindOfChallengeController.getElementById);

module.exports = api;