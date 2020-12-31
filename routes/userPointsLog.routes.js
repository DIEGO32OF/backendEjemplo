'use strict'
var expres = require('express');


var api = expres.Router();
let points_user = require('../controllers/userPointsLog.controller');
var md_Auth = require('../middleware/auth.middleware');

api.get('/points/user/getPointsUserByTemporality/:bacKDays/:userId', md_Auth.verify, points_user.getPointsUserByTemporality);
api.post('/points/user/', md_Auth.verify, points_user.createElement);
api.put('/points/user/updateOrCreate/', md_Auth.verify, points_user.updateOrCreate);
api.get('/points/user/', md_Auth.verify, points_user.getAllElements);
api.get('/points/user/one/', md_Auth.verify, points_user.getOneElement);
api.put('/points/user/findAndUpdate/', md_Auth.verify, points_user.findAndUpdateElement);
api.delete('/points/user/:id', md_Auth.verify, points_user.deleteElementById);
api.put('/points/user/:id', md_Auth.verify, points_user.updateElementById);
api.get('/points/user/:id', md_Auth.verify, points_user.getElementById);

module.exports = api;