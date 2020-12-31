'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de catgeorias de retos
 * esta es el controler que permite CRUD de categorias de retos
 */


let model_ = require('./../models/teamForChallenge.model')
let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')
let util = require('./../helpers/utilities.helper')
let companyModel = require('./../models/company.model')
let userModel = require('./../models/user.model')

var validationObject = {
    description: 'string',
    name: 'string,mandatory',
    goals_by_team: 'number,mandatory',
};

let populate = [
    {
        path: 'company',
        model: companyModel,
        select: {logo: 1, name: 1}
    },
    {
        path: 'participants',
        model: userModel,
        select: {rol: 1, points: 1, picture: 1, company: 1, name: 1, mail: 1}
    },
    {
        path: 'accept_participants',
        model: userModel,
        select: {rol: 1, points: 1, picture: 1, company: 1, name: 1, mail: 1}
    },
];

let fucntions = {
    createElement: basicCrudConstructorHelper.new(model_, validationObject, async function (data) {

        return data
    }),
    updateOrCreate: basicCrudConstructorHelper.updateOrCreate(model_, validationObject),
    getAllElements: basicCrudConstructorHelper.listAll(model_, populate),
    getElementById: basicCrudConstructorHelper.oneById(model_, populate),
    getOneElement: basicCrudConstructorHelper.oneBySearch(model_, populate),
    updateElementById: basicCrudConstructorHelper.idUpdate(model_, validationObject),
    findAndUpdateElement: basicCrudConstructorHelper.searchAndUpdate(model_, validationObject, populate),
    deleteElementById: basicCrudConstructorHelper.idDelete(model_),

    acceptTeam: async function (req, res) {
        let {teamID, userID} = req.params;
        let response = {}
        if (!teamID || !userID) {
            response = await responseCodes.getErrorByCode(435)
            res.status(435).json(response)
            return 0;
        }
        try {
            let team = await model_.findById(teamID);
            team.participants = util.removeElementFromArray(team.participants, userID)
            team.participants.push(userID);
            team = await team.save()
            response = await responseCodes.getErrorByCode(200)
            response.data = team;
            res.status(200).json(response)
            return 0;
        } catch (e) {
            response = await responseCodes.getErrorByCode(500)
            response.error = e;
            res.status(500).json(response)
            return 0;
        }

    }
}

module.exports = fucntions;