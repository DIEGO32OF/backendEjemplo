'use strict'
/**
 * V1.0 Diego Rivas
 * helper que ayuda a crear el constructor basico de operaciones CRUD
 * TODO: implementar funcion push en child object
 */

let crudFunctions = {}
let moment = require('moment');
let objectValidatorHelper = require('./objectValidator.helper')
let responseCodesHelper = require('./respoonse_codes.helper')

crudFunctions.new = function (model_, validationObject, f_) {
    return async function (req, res) {
        let {body} = req;
        var response = {};
        let validation = objectValidatorHelper.validateObject(body, validationObject, true);
        if (!validation.success) {
            response = await responseCodesHelper.getErrorByCode(435);
            response.message_detail = validation.messages.join(',')
            res.status(435).json(response);
            return false;
        }
        try {
            let newElement = new model_(body);
            newElement = await newElement.save();
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = newElement;
            if (f_ && typeof (f_) == 'function') {
                response = await f_(response)
            }
            res.status(200).json(response);
        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }


    }
}

crudFunctions.updateOrCreate = function (model_, validationObject) {
    return async function (req, res) {
        let {data, where} = req.body;
        var response = {};
        let validation = objectValidatorHelper.validateObject(data, validationObject);
        if (!validation.success) {
            response = await responseCodesHelper.getErrorByCode(435);
            response.message_detail = validation.messages.join(',')
            res.status(435).json(response);
            return false;
        }
        try {
            let newElement = await model_.findOne(where);
            if (!newElement) {
                newElement = new model_(where);
            }

            for (var [key, value] of Object.entries(data)) {
                newElement [key] = value
            }

            data.updatedAt = moment().format()
            newElement = await newElement.save();
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = newElement;
            res.status(200).json(response);
        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }


    }
}

crudFunctions.listAll = function (model_, populate) {
    return async function (req, res) {

        let {where, select, paginate, sort, depopulate} = req.query;

        var find = {};
        var response = {};
        if (where) {
            for (const [key, val] of Object.entries(where)) {
                find[key] = val;
            }
        }

        let query = model_.find(find);
        if (select) {
            if (typeof select == 'string') {
                select = select.split(',')
            }
            let ob = {}
            select.map(function (item, i) {

                ob[item] = 1

            });
            query.select(ob)
        }
        if (paginate && paginate.limit && paginate.page) {
            paginate.limit = Number(paginate.limit);
            paginate.page = Number(paginate.page);
            query.limit(paginate.limit).skip(paginate.page * paginate.limit);
        }
        if (sort) {
            let order = {};
            for (const [key, val] of Object.entries(sort)) {
                order[key] = val;
            }
            query.sort(order);
        }
        if (populate && !depopulate) {
            if (populate && populate.length > 0) {
                populate.map(function (item, i, arr) {
                    query.populate(item)
                });
            }
        }
        try {
            let list_of_elements = await query.exec()
            if (!list_of_elements) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = list_of_elements;
            response.count = list_of_elements.length;
            res.status(200).json(response);
            return true;

        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }

    }
}

crudFunctions.oneById = function (model_, populate) {
    return async function (req, res) {
        let {id} = req.params;
        let {select, depopulate} = req.query
        var response = {};
        try {
            let query = model_.findById(id);
            if (select) {
                if (typeof select == 'string') {
                    select = select.split(',')
                }
                let ob = {}
                select.map(function (item, i) {

                    ob[item] = 1

                });
                query.select(ob)
            }
            if (populate && !depopulate) {
                if (populate && populate.length > 0) {
                    populate.map(function (item, i, arr) {
                        query.populate(item)
                    });
                }
            }
            let element = await query.exec();

            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = element;
            res.status(200).json(response);
            return true;

        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }
    }
}

crudFunctions.oneBySearch = function (model_, populate) {
    return async function (req, res) {
        let {where, select, depopulate} = req.query;
        var find = {};
        var response = {};

        if (where) {
            for (const [key, val] of Object.entries(where)) {
                find[key] = val;
            }
        }
        let query = model_.findOne(find);
        if (select) {
            if (typeof select == 'string') {
                select = select.split(',')
            }
            let ob = {}
            select.map(function (item, i) {

                ob[item] = 1

            });
            query.select(ob)
        }
        if (populate && populate.length > 0 && !depopulate) {
            populate.map(function (item, i, arr) {
                query.populate(item)
            });
        }

        try {
            let element = await query.exec()
            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = element;
            res.status(200).json(response);
            return true;

        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }
    }
}

crudFunctions.idUpdate = function (model_, validationObject) {
    return async function (req, res) {
        let {params, body} = req;
        let {id} = params;
        let response = {};
        body.updatedAt = moment().format();
        let validation = objectValidatorHelper.validateObject(body, validationObject);
        if (!validation.success) {
            response = await responseCodesHelper.getErrorByCode(435);
            response.message_detail = validation.messages.join(',')
            res.status(435).json(response);
            return false;
        }
        try {
            let element = await model_.findByIdAndUpdate(id, {$set: body});
            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            element = await model_.findById(id);
            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = element;
            res.status(200).json(response);
            return true;
        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }
    }
}

crudFunctions.searchAndUpdate = function (model_, validationObject, populate) {
    return async function (req, res) {
        let {data, query, depopulate} = req.body;
        let {where, select} = query;
        var find = {};

        var response = {};

        if (where) {
            for (const [key, val] of Object.entries(where)) {
                find[key] = val;
            }
        }
        query = model_.findOne(find);
        if (select) {
            if (typeof select == 'string') {
                select = select.split(',')
            }
            let ob = {}
            select.map(function (item, i) {

                ob[item] = 1

            });
            query.select(ob)
        }
        if (populate && populate.length > 0 && !depopulate) {
            populate.map(function (item, i, arr) {
                query.populate(item)
            });
        }

        data.updatedAt = moment().format();
        let validation = objectValidatorHelper.validateObject(data, validationObject);
        if (!validation.success) {
            response = await responseCodesHelper.getErrorByCode(435);
            response.message_detail = validation.messages.join(',')
            res.status(435).json(response);
            return false;
        }
        try {
            let element = await query.exec()
            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            for (const [key, val] of Object.entries(data)) {
                element[key] = val;
            }
            element.updatedAt = moment().format()
            element = await element.save();

            response = await responseCodesHelper.getErrorByCode(200);
            response.data = element;
            res.status(200).json(response);
            return true;

        } catch (e) {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }
    }
}

crudFunctions.idDelete = function (model_) {
    return async function (req, res) {
        var id = req.params.id;
        var response = {}
        try {
            let element = await model_.findByIdAndRemove(id);
            if (!element) {
                response = await responseCodesHelper.getErrorByCode(404);
                res.status(404).json(response);
                return false;
            }
            response = await responseCodesHelper.getErrorByCode(200);
            response.data = element;
            res.status(200).json(response);
            return true;
        } catch {
            console.error(e)
            response = await responseCodesHelper.getErrorByCode(500);
            response.error = e;
            res.status(500).json(response);
            return false;
        }
    }
}
module.exports = crudFunctions;