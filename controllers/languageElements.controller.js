'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de Elementos de lenguaje que permite el control de internacionalizacion i18n
 * esta es el controler que permite CRUD de los elementos del lenguaje para la internacionalizacion i18n
 */


let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')
let model_ = require('./../models/languageElements.model')
let languageModel = require('./../models/language.model')
var validationObject = {
    reference: 'string,mandatory',
    text: 'string,mandatory'
};

let populate = [{path: 'language', model: languageModel}]

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