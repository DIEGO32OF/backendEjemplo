'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de catgeorias de retos
 * esta es el controler que permite CRUD de categorias de retos
 */


let model_ = require('./../models/categoryOfChallenge.model')
let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')

var validationObject = {
    description: 'string',
    name: 'string,mandatory'
};

let populate = false;

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