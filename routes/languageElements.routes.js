'use strict'

var expres = require('express');
var authMiddleware = require('./../middleware/auth.middleware');

var api = expres.Router();
let languageElementsController = require('../controllers/languageElements.controller');

var md_Auth = require('../middleware/auth.middleware');
api.post('/language_elements/', md_Auth.verify, languageElementsController.createElement);
api.put('/language_elements/updateOrCreate/', md_Auth.verify, languageElementsController.updateOrCreate);
api.get('/language_elements/', md_Auth.verify, languageElementsController.getAllElements);
api.get('/language_elements/one/', md_Auth.verify, languageElementsController.getOneElement);
api.put('/language_elements/findAndUpdate/', md_Auth.verify, languageElementsController.findAndUpdateElement);
api.delete('/language_elements/:id', md_Auth.verify, languageElementsController.deleteElementById);
api.put('/language_elements/:id', md_Auth.verify, languageElementsController.updateElementById);
api.get('/language_elements/:id', md_Auth.verify, languageElementsController.getElementById);

/**
 * @api {post} /language_elements
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName Crea un nuevo elemento de lenguaje  en la coleccion de lenguajes
 * @apiParam {ObjectID} language    id del lenguaje
 * @apiParam {String} reference     referencia para la busqueda
 * @apiParam {String} text          texto en el idioma deseado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {get} /language_elements
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName Trae la coleccion completa de elementos
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":[{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  },...]
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {get} /language_elements/:id
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName Trae la 1 elemento de la coleccion
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {get} /language_elements/one/
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName Trae la 1 elemento de la coleccion por busqueda
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {put} /language_elements/:id
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName actualiza un elemento por id
 * @apiParam {ObjectID} language    id del lenguaje
 * @apiParam {String} reference     referencia para la busqueda
 * @apiParam {String} text          texto en el idioma deseado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {put} /language_elements/findAndUpdate
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName actualiza un elemento por busqueda del elemeto
 * @apiParam {ObjectID} language    id del lenguaje
 * @apiParam {String} reference     referencia para la busqueda
 * @apiParam {String} text          texto en el idioma deseado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */
/**
 * @api {delete} /language_elements/:id
 * @apiGroup language_elements
 * @apiVersion 1.0.0
 * @apiName Elimina un elemento por id
 * @apiParam {ObjectID} language    id del lenguaje
 * @apiParam {String} reference     referencia para la busqueda
 * @apiParam {String} text          texto en el idioma deseado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *  "message":"ok",
 *  "success":true,
 *  "data":{
 *      "_id" : ObjectId("5e95da0be024e936c8b5d87f"),
 *      "language" : 5e95da0be024e439c8b5d87k,
 *      "reference":"send_message",
 *      "text":"Enviar Mensaje",
 *      "createdAt":"2020-05-26T01:16:35.000Z",
 *      "updatedAt":"2020-05-26T01:16:35.000Z",
 *      "__v":0
 *  }
 *}
 * @apiErrorExample {json} message
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message":"Internal Server Error",
 *      "success":false,
 *      "error":{ ERR OBJECT},
 *
 *    }
 */

module.exports = api;