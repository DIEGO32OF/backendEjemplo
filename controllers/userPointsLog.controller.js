'use strict'
/**
 * V1.0 Diego Rivas
 * Controller de catalogo de puntos de usuario
 */


let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')
let responseCodesHelper = require('./../helpers/respoonse_codes.helper')
let model_ = require('./../models/userPointsLog.model')

let userModel = require('./../models/user.model')
let companyModel = require('./../models/company.model')
let activityModel = require('./../models/activity.model')
let challengeModel = require('./../models/challenge.model')

var validationObject = {
    points: 'number,mandatory'
};

let populate = [{
    path: 'user',
    model: userModel
}, {
    path: 'company',
    model: companyModel
}, {
    path: 'activity',
    model: activityModel
}, {
    path: 'challenge',
    model: challengeModel
},
]

let fucntions = {
    createElement: basicCrudConstructorHelper.new(model_, validationObject),
    updateOrCreate: basicCrudConstructorHelper.updateOrCreate(model_, validationObject),
    getAllElements: basicCrudConstructorHelper.listAll(model_, populate),
    getElementById: basicCrudConstructorHelper.oneById(model_, populate),
    getOneElement: basicCrudConstructorHelper.oneBySearch(model_, populate),
    updateElementById: basicCrudConstructorHelper.idUpdate(model_, validationObject),
    findAndUpdateElement: basicCrudConstructorHelper.searchAndUpdate(model_, validationObject, populate),
    deleteElementById: basicCrudConstructorHelper.idDelete(model_),

    getPointsUserByTemporality: async function (req, res) {
        try {
            let {bacKDays, userId} = req.params;
            if (!bacKDays) {
                bacKDays = 30
            }

            let agreggation = [{
                $match: {
                    $and: [
                        {date_reg: {$lte: new Date(Date.now())}},
                        {date_reg: {$gte: new Date(Date.now() - (bacKDays * 24 * 60 * 60 * 1000))}},
                        {user: userId}
                    ]
                }
            },
                {$sort: {date_reg: 1}},
            ]
            let agr = await model_.aggregate(agreggation).group({
                count: {
                    $sum: "$points"
                }
            }).exec()

            var res = await responseCodesHelper.getErrorByCode(200)
            res.data = agr
            res.status(200).json(res)

        } catch (e) {
            console.error(e)
            var res = await responseCodesHelper.getErrorByCode(500)
            res.error = e
            res.status(500).json(res)
        }


    }

}

module.exports = fucntions;