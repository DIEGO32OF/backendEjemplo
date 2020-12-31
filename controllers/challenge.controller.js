'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de catgeorias de retos
 * esta es el controler que permite CRUD de categorias de retos
 */


let model_ = require('./../models/challenge.model')
let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')
let responseCodes = require('./../helpers/respoonse_codes.helper')
let util = require('./../helpers/utilities.helper')

let kindOfChallenge = require('./../models/kindOfChallenge.model')
let categoryOfChallengeModel = require('./../models/categoryOfChallenge.model')
let companyModel = require('./../models/company.model')
let userModel = require('./../models/user.model')
let teamModel = require('./../models/teamForChallenge.model')

var validationObject = {
    description: 'string',
    title: 'string,mandatory',
    points: 'number,mandatory'
};

let populate = [
    {
        path: 'kind',
        model: kindOfChallenge
    }, {
        path: 'category',
        model: categoryOfChallengeModel
    }, {
        path: 'company',
        model: companyModel
    }, {
        path: 'participants',
        model: userModel,
        select: {rol: 1, points: 1, picture: 1, company: 1, name: 1, mail: 1}
    }, {
        path: 'teams',
        model: teamModel,
        populate: [{
            path: 'participants',
            model: userModel,
            select: {rol: 1, points: 1, picture: 1, company: 1, name: 1, mail: 1}
        }, {
            path: 'accept_participants',
            model: userModel,
            select: {rol: 1, points: 1, picture: 1, company: 1, name: 1, mail: 1}
        }]
    },
];

let functions = {
    createElement: basicCrudConstructorHelper.new(model_, validationObject),
    updateOrCreate: basicCrudConstructorHelper.updateOrCreate(model_, validationObject),
    getAllElements: basicCrudConstructorHelper.listAll(model_, populate),
    getElementById: basicCrudConstructorHelper.oneById(model_, populate),
    getOneElement: basicCrudConstructorHelper.oneBySearch(model_, populate),
    updateElementById: basicCrudConstructorHelper.idUpdate(model_, validationObject),
    findAndUpdateElement: basicCrudConstructorHelper.searchAndUpdate(model_, validationObject, populate),
    deleteElementById: basicCrudConstructorHelper.idDelete(model_),

}

module.exports = functions;