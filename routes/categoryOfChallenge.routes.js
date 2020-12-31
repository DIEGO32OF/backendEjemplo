'use strict'
var expres = require('express');


var api = expres.Router();
let categoryOfChallengeController = require('../controllers/categoryOfChallenge.controller');
var md_Auth = require('../middleware/auth.middleware');

api.post('/category/challenge/', md_Auth.verify, categoryOfChallengeController.createElement);
api.put('/category/challenge/updateOrCreate/', md_Auth.verify, categoryOfChallengeController.updateOrCreate);
api.get('/category/challenge/', md_Auth.verify, categoryOfChallengeController.getAllElements);
api.get('/category/challenge/one/', md_Auth.verify, categoryOfChallengeController.getOneElement);
api.put('/category/challenge/findAndUpdate/', md_Auth.verify, categoryOfChallengeController.findAndUpdateElement);
api.delete('/category/challenge/:id', md_Auth.verify, categoryOfChallengeController.deleteElementById);
api.put('/category/challenge/:id', md_Auth.verify, categoryOfChallengeController.updateElementById);
api.get('/category/challenge/:id', md_Auth.verify, categoryOfChallengeController.getElementById)
;

module.exports = api;