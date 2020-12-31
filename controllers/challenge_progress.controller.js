'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de progreso de retos

 */


let model_ = require('./../models/challenge_progress.model')
let challengeModel = require('./../models/challenge.model')
let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')

var validationObject = {
    step: 'Number',
    achieved_points: 'Number',
    name: 'string'
};

let populate = [{
    path: 'challenge',
    model: challengeModel
}];

let fucntions = {
    createElement: basicCrudConstructorHelper.new(model_, validationObject),
    updateOrCreate: basicCrudConstructorHelper.updateOrCreate(model_, validationObject),
    getAllElements: basicCrudConstructorHelper.listAll(model_, populate),
    getElementById: basicCrudConstructorHelper.oneById(model_, populate),
    getOneElement: basicCrudConstructorHelper.oneBySearch(model_, populate),
    updateElementById: basicCrudConstructorHelper.idUpdate(model_, validationObject),
    findAndUpdateElement: basicCrudConstructorHelper.searchAndUpdate(model_, validationObject, populate),
    deleteElementById: basicCrudConstructorHelper.idDelete(model_),
}

module.exports = fucntions;