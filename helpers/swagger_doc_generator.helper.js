const fs = require('fs');
const path = require('path');
var dir_ = path.join(__dirname, 'swagger.json')
var lodash = require('lodash')
var responseCodesHelper = require('./respoonse_codes.helper')


let manualPaths = {
    "/api/team/accept/{:teamID}/{:userID}": {
        "post": {
            "x-swagger-router-controller": "team_for_challenge",
            "operationId": "accept_team_0001",
            "tags": [
                "team_for_challenge"
            ],
            "description": "Using to move person to accepted ",
            "parameters": [
                {
                    "name": "authorization",
                    "in": "header",
                    "type": "string",
                    "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                    "required": true
                },
                {
                    "name": "teamID",
                    "in": "path",
                    "description": "Id del team",
                    "type": "string",
                    "example": "R4W133RT27b3fdn343n",
                    "required": false
                },
                {
                    "name": "userID",
                    "in": "path",
                    "description": "Id del usuario",
                    "type": "string",
                    "example": "09W133DaT27b3fdn343n",
                    "required": false
                },
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of /api/admin_roles",
                    "examples": {
                        "application/json": {
                            "mesage": "OK",
                            "success": true,
                            "data": []
                        }
                    }
                },
                "403": {
                    "description": "Forbbiden",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "403 forbidden  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                },
                "404": {
                    "description": "Not Found",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "404 not found  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "500  internal server error  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                }
            }
        },
    },
    "/api/points/user/getPointsUserByTemporality/{:bacKDays}/{:userId}": {
        "get": {
            "x-swagger-router-controller": "team_for_challenge",
            "operationId": "user_points_get_00x1",
            "tags": [
                "user_points"
            ],
            "description": "Trae la suma de los puntos del usuario por un cierto tiempo atras",
            "parameters": [
                {
                    "name": "authorization",
                    "in": "header",
                    "type": "string",
                    "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                    "required": true
                },
                {
                    "name": "bacKDays",
                    "in": "path",
                    "description": "Cuantos dias atras 30 es un mes",
                    "type": "number",
                    "example": 30,
                    "required": false
                },
                {
                    "name": "userID",
                    "in": "path",
                    "description": "Id del usuario",
                    "type": "string",
                    "example": "09W133DaT27b3fdn343n",
                    "required": false
                },
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of /api/admin_roles",
                    "examples": {
                        "application/json": {
                            "mesage": "OK",
                            "success": true,
                            "data": []
                        }
                    }
                },
                "403": {
                    "description": "Forbbiden",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "403 forbidden  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                },
                "404": {
                    "description": "Not Found",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "404 not found  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "examples": {
                        "application/json": {
                            "success": false,
                            "message": "500  internal server error  - Error Mesage ",
                            "error": "error_data"
                        }
                    }
                }
            }
        },
    }
}

let arrayForQueryHelperConstructor = [
    {
        path: '/api/user/',
        family: 'user',
        model: require('./../models/user.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'challenge mode',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "wellness": 1,
                "tester": false,
                "steps_goal": [{
                    points: 1, steps: 0
                }],
                "test": "",
                "status": "inactive",
                "seven_days": 0,
                "rol": "",
                "points": 0,
                "picture": "http://sitio.com/miimage.jpg",
                "active": true,
                "old_week": 0,
                "name_first": "",
                "name": "",
                "mail": "",
                "last_name_first": "",
                "last_name": "",
                "lenguage": "es_MX",
                "gender": "",
                "diet": "",
                "create_date": "",
                "cell_phone": "",
                "born_date": "",
                "racha": "",
                "daily": "",
                "conversation": "",
                "conversationStatus": "",
                "chat_bot_room": "",
                "filtros": {name: '', value: ''},
                "activityUser": "ObjectId",
                "company": "ObjectId",
                "userTest": "ObjectId",
                "pass": "",
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "wellness": 1,
                    "tester": false,
                    "steps_goal": [{
                        points: 1, steps: 0
                    }],
                    "test": "",
                    "status": "inactive",
                    "seven_days": 0,
                    "rol": "",
                    "points": 0,
                    "picture": "http://sitio.com/miimage.jpg",
                    "active": true,
                    "old_week": 0,
                    "name_first": "",
                    "name": "",
                    "mail": "",
                    "last_name_first": "",
                    "last_name": "",
                    "lenguage": "es_MX",
                    "gender": "",
                    "diet": "",
                    "create_date": "",
                    "cell_phone": "",
                    "born_date": "",
                    "racha": "",
                    "daily": "",
                    "conversation": "",
                    "conversationStatus": "",
                    "chat_bot_room": "",
                    "filtros": {name: '', value: ''},
                    "activityUser": "ObjectId",
                    "company": "ObjectId",
                    "userTest": "ObjectId",
                    "pass": "",
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "wellness": 1,
                        "tester": false,
                        "steps_goal": [{
                            points: 1, steps: 0
                        }],
                        "test": "",
                        "status": "inactive",
                        "seven_days": 0,
                        "rol": "",
                        "points": 0,
                        "picture": "http://sitio.com/miimage.jpg",
                        "active": true,
                        "old_week": 0,
                        "name_first": "",
                        "name": "",
                        "mail": "",
                        "last_name_first": "",
                        "last_name": "",
                        "lenguage": "es_MX",
                        "gender": "",
                        "diet": "",
                        "create_date": "",
                        "cell_phone": "",
                        "born_date": "",
                        "racha": "",
                        "daily": "",
                        "conversation": "",
                        "conversationStatus": "",
                        "chat_bot_room": "",
                        "filtros": {name: '', value: ''},
                        "activityUser": "ObjectId",
                        "company": "ObjectId",
                        "userTest": "ObjectId",
                        "pass": "",
                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        }, {
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "wellness": 1,
                "tester": false,
                "steps_goal": [{
                    points: 1, steps: 0
                }],
                "test": "",
                "status": "inactive",
                "seven_days": 0,
                "rol": "",
                "points": 0,
                "picture": "http://sitio.com/miimage.jpg",
                "active": true,
                "old_week": 0,
                "name_first": "",
                "name": "",
                "mail": "",
                "last_name_first": "",
                "last_name": "",
                "lenguage": "es_MX",
                "gender": "",
                "diet": "",
                "create_date": "",
                "cell_phone": "",
                "born_date": "",
                "racha": "",
                "daily": "",
                "conversation": "",
                "conversationStatus": "",
                "chat_bot_room": "",
                "filtros": {name: '', value: ''},
                "activityUser": "ObjectId",
                "company": "ObjectId",
                "userTest": "ObjectId",
                "pass": "",
            }
        }],

        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/team/',
        family: 'Team for challenge',
        model: require('./../models/teamForChallenge.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "name": "Nombre del equipo",
                "description": 'Pequeña descripcion del elemento',
                "picture": "http://miimagen.jpg",
                "goals_by_team": 1,
                "winner": "ObjectID(9RF343vd3b7cdb0)",
                "company": "ObjectID(9RF343vd3b7cdb0)",
                "participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
                "accept_participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "name": "Nombre del equipo",
                    "description": 'Pequeña descripcion del elemento',
                    "picture": "http://miimagen.jpg",
                    "goals_by_team": 1,
                    "winner": "ObjectID(9RF343vd3b7cdb0)",
                    "company": "ObjectID(9RF343vd3b7cdb0)",
                    "participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
                    "accept_participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "name": "Nombre del equipo",
                        "description": 'Pequeña descripcion del elemento',
                        "picture": "http://miimagen.jpg",
                        "goals_by_team": 1,
                        "winner": "ObjectID(9RF343vd3b7cdb0)",
                        "company": "ObjectID(9RF343vd3b7cdb0)",
                        "participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
                        "accept_participants": ["ObjectID(9RF343vd3b7cdb0)", "ObjectID(9RF343vd3b7cdb0)"],
                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/language/',
        family: 'Language i18n',
        model: require('./../models/language.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "name": "Español Mexico",
                "description": 'Español mexicano',
                "utf8_flag": "🇲🇽",
                "iso_language_code": "es_MX",

            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "name": "Español Mexico",
                    "description": 'Español mexicano',
                    "utf8_flag": "🇲🇽",
                    "iso_language_code": "es_MX",
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "name": "Español Mexico",
                        "description": 'Español mexicano',
                        "utf8_flag": "🇲🇽",
                        "iso_language_code": "es_MX",

                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/language_elements/',
        family: 'Language Elements i18n',
        model: require('./../models/languageElements.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "language": "ObjectID(df3RFG50832bTs34)",
                "reference": 'internal_server_error',
                "text": "internal server error",
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "language": "ObjectID(df3RFG50832bTs34)",
                    "reference": 'internal_server_error',
                    "text": "internal server error",
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "language": "ObjectID(df3RFG50832bTs34)",
                        "reference": 'internal_server_error',
                        "text": "internal server error",
                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/category/challenge/',
        family: 'Category of challenges',
        model: require('./../models/categoryOfChallenge.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "description": 'internal_server_error',
                "name": "internal server error",
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "description": 'internal_server_error',
                    "name": "internal server error",
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "description": 'internal_server_error',
                        "name": "internal server error",
                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/kind/challenge/',
        family: 'Kind  of challenges',
        model: require('./../models/kindOfChallenge.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'KindName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "description": 'tipo del elemento',
                "name": "individual",
                "key": "reto_individual",
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "description": 'tipo del elemento',
                    "name": "individual",
                    "key": "reto_individual",

                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "description": 'tipo del elemento',
                        "name": "individual",
                        "key": "reto_individual",

                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/challenge/',
        family: 'challenges',
        model: require('./../models/kindOfChallenge.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'challenge mode',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "description": 'Un reto de altura',
                "title": "Reto de escalar",
                "picture": "http://miimagen.com/image.jpg",
                "kind": "ObjectId(RSiodfa093r2dsar32)",
                "category": "ObjectId(RSioFra093r2dsar32)",
                "participants": "[ObjectId(RSioFGE093r2dsar32),ObjectId(RSDSra093r2dsar32)]",
                "winner": "ObjectId(RSioFGE093r2dsar32)",
                "teams": "[ObjectId(RSioFGE093r2dsar33),ObjectId(RSDSra093r2dsar31)]",
                "points": "100",
                "active": true,
                "start_date": "2020-08-10T11:21:08-05:00",
                "end_date": "2020-08-10T11:21:08-05:0",
            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "description": 'Un reto de altura',
                    "title": "Reto de escalar",
                    "picture": "http://miimagen.com/image.jpg",
                    "kind": "ObjectId(RSiodfa093r2dsar32)",
                    "category": "ObjectId(RSioFra093r2dsar32)",
                    "participants": "[ObjectId(RSioFGE093r2dsar32),ObjectId(RSDSra093r2dsar32)]",
                    "winner": "ObjectId(RSioFGE093r2dsar32)",
                    "teams": "[ObjectId(RSioFGE093r2dsar33),ObjectId(RSDSra093r2dsar31)]",
                    "points": "100",
                    "active": true,
                    "start_date": "2020-08-10T11:21:08-05:00",
                    "end_date": "2020-08-10T11:21:08-05:0",
                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "description": 'Un reto de altura',
                        "title": "Reto de escalar",
                        "picture": "http://miimagen.com/image.jpg",
                        "kind": "ObjectId(RSiodfa093r2dsar32)",
                        "category": "ObjectId(RSioFra093r2dsar32)",
                        "participants": "[ObjectId(RSioFGE093r2dsar32),ObjectId(RSDSra093r2dsar32)]",
                        "winner": "ObjectId(RSioFGE093r2dsar32)",
                        "teams": "[ObjectId(RSioFGE093r2dsar33),ObjectId(RSDSra093r2dsar31)]",
                        "points": "100",
                        "active": true,
                        "start_date": "2020-08-10T11:21:08-05:00",
                        "end_date": "2020-08-10T11:21:08-05:0",
                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/progress/challenge/',
        family: 'Challenge progress',
        model: require('./../models/challenge_progress.model'),
        parametersOfGetAll: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "step": 1,
                "achieved_points": 30,
                "name": "name of step",
                "user": "ObjectID(9RF343vd3b7cdb0)",
                "challenge": "ObjectID(9RF343vd3b7cdb0)",

            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'TeamName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "step": 1,
                    "achieved_points": 30,
                    "name": "name of step",
                    "user": "ObjectID(9RF343vd3b7cdb0)",
                    "challenge": "ObjectID(9RF343vd3b7cdb0)",

                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "step": 1,
                        "achieved_points": 30,
                        "name": "name of step",
                        "user": "ObjectID(9RF343vd3b7cdb0)",
                        "challenge": "ObjectID(9RF343vd3b7cdb0)",

                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        }, {
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "step": 1,
                "achieved_points": 30,
                "name": "name of step",
                "user": "ObjectID(9RF343vd3b7cdb0)",
                "challenge": "ObjectID(9RF343vd3b7cdb0)",

            }
        }],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
    {
        path: '/api/points/user/',
        family: 'user points',
        model: require('./../models/userPointsLog.model'),
        parametersOfGetAll: [
            {
                name: "where[points]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'KindName',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
            {
                name: "sort[name]",
                in: 'query',
                description: 'El o los campos por los cuales se va  a ordenar la busqueda, (varias instancias del sort), puede ser ascendente[asc] o descendente[desc] ',
                type: 'string',
                example: 'asc',
                required: false
            },
            {
                name: "paginate[limit]",
                in: 'query',
                description: 'El limite de documentos por pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },
            {
                name: "paginate[page]",
                in: 'query',
                description: 'El numero de la pagina. debe ir acompañado del otro documento d ela paginación ',
                type: 'integer',
                example: 1,
                required: false
            },

        ],
        parametersOfPostOne: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "user": 'ObjectID("KDhjbhfd84bd7f4d")',
                "company": 'ObjectID("KDhjbhfd84bd7f4d")',
                "activity": 'ObjectID("KDhjbhfd84bd7f4d")',
                "activitychallenge": 'ObjectID("KDhjbhfd84bd7f4d")',
                points: 0

            }
        }],
        parametersOfGetOne: [
            {
                name: "where[name]",
                in: 'query',
                description: 'Con este parametro podrás filtrar la búsqueda por algun documento, siempre que cumpla con la condición (varias instancias del where)',
                type: 'string',
                example: 'Español Mexicano',
                required: false
            },
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },],
        parametersOfGetOneById: [
            {
                name: "select",
                in: 'query',
                description: 'Con este documento  podrás seleccionar los campos a devolver, (separado por comas)',
                type: 'string',
                example: 'description,name',
                required: false
            },
            {
                name: "id",
                in: 'path',
                description: 'El id del documento  ',
                type: 'string',
                example: "P028esh37dwhSDDS3e",
                required: true
            },
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            },
        ],
        parametersOfPutOrCreate: [{
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                where: {
                    "name": "Nombre del elemento a buscar",
                },
                data: {
                    "user": 'ObjectID("KDhjbhfd84bd7f4d")',
                    "company": 'ObjectID("KDhjbhfd84bd7f4d")',
                    "activity": 'ObjectID("KDhjbhfd84bd7f4d")',
                    "activitychallenge": 'ObjectID("KDhjbhfd84bd7f4d")',
                    points: 0

                }
            }
        }],
        parametersOfPutFindOrUpdate: [
            {
                name: "depopulate",
                in: 'query',
                description: 'retira la populacion de los campos hijo ',
                type: 'boolean',
                example: true,
                required: false
            }, {
                "name": "JSON OBJECT",
                "description": "Con este objeto insertaremos un nuevo documento en la coleccion o se creara uno nuevo en caso de no existir.",
                "in": "body",
                "type": "object",
                "collectionFormat": "multi",
                "items": {
                    "type": "object"
                },
                "required": true,
                "example": {
                    query: {
                        "name": "Nombre del elemento a buscar",
                    },
                    data: {
                        "user": 'ObjectID("KDhjbhfd84bd7f4d")',
                        "company": 'ObjectID("KDhjbhfd84bd7f4d")',
                        "activity": 'ObjectID("KDhjbhfd84bd7f4d")',
                        "activitychallenge": 'ObjectID("KDhjbhfd84bd7f4d")',
                        points: 0

                    }
                }
            }],
        parametersOfPutById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        }, {
            "name": "JSON OBJECT",
            "description": "Con este objeto insertaremos un nuevo documento en la coleccion.",
            "in": "body",
            "type": "object",
            "collectionFormat": "multi",
            "items": {
                "type": "object"
            },
            "required": true,
            "example": {
                "user": 'ObjectID("KDhjbhfd84bd7f4d")',
                "company": 'ObjectID("KDhjbhfd84bd7f4d")',
                "activity": 'ObjectID("KDhjbhfd84bd7f4d")',
                "activitychallenge": 'ObjectID("KDhjbhfd84bd7f4d")',
                points: 0

            }
        }],
        parametersOfDeleteById: [{
            name: "id",
            in: 'path',
            description: 'El id del documento  ',
            type: 'string',
            example: "P028esh37dwhSDDS3e",
            required: true
        },],
        bearer_auth: true,
    },
]

let swaggerConstructor = async function (f_) {

    let swaggerBaseJSON = {
        "swagger": "2.0",
        "info": {
            "title": "La presente es la documentación de la API REST para habits.ai  ",
            "description": "En esta documentación se encuentran listados los endpoints de comunicacion con la API de habits, De la misma manera se recomianda leer atentamente y hacer uso correcto de los recursos aqui mostrados ",
            "version": "0.0.0.1"
        },
        "host": "api.habits.io",
        "produces": [
            "application/json"
        ],
        "paths": {}
    }
    var c200 = await responseCodesHelper.getErrorByCode(200);
    var c403 = await responseCodesHelper.getErrorByCode(403);
    var c404 = await responseCodesHelper.getErrorByCode(404);
    var c500 = await responseCodesHelper.getErrorByCode(500);

    for (var i = 0; i < arrayForQueryHelperConstructor.length; i++) {
        let item = arrayForQueryHelperConstructor[i];
        let family = lodash.snakeCase(item.family)

        swaggerBaseJSON.paths[item.path] = {};
        var response = await item.model.find().limit(3).skip(0).exec();
        if (item.bearer_auth) {
            item.parametersOfGetAll.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfPostOne.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true

            });
            item.parametersOfDeleteById.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfPutById.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfPutFindOrUpdate.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfPutOrCreate.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfPostOne.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfGetOneById.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
            item.parametersOfGetOne.push({
                "name": "authorization",
                "in": "header",
                "type": "string",
                "description": "El token de autenticacion es utilizado para acceder a los recursos del servidor, para obtenerlo hay que acceder al login",
                "required": true
            });
        }
        c200.data = response;
        c403.error = 'ERROR OBJECT'
        c404.error = 'ERROR OBJECT'
        c500.error = 'ERROR OBJECT'

        swaggerBaseJSON.paths[item.path]["get"] = {
            "x-swagger-router-controller": family,
            "operationId": "get_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se extraen todos los datos del catalogo ",
            "parameters": item.parametersOfGetAll,
            "responses": {
                "200": {
                    "description": "Returns a list of " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        c200.data = response[0];
        swaggerBaseJSON.paths[item.path]["post"] = {
            "x-swagger-router-controller": family,
            "operationId": "post_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se agregan nuevos documentos al catalogo ",
            "parameters": item.parametersOfPostOne,
            "responses": {
                "200": {
                    "description": "Returns a list of " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + 'updateOrCreate/'] = {};
        swaggerBaseJSON.paths[item.path + 'updateOrCreate/']["put"] = {
            "x-swagger-router-controller": family,
            "operationId": "putUOC_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se actualizan los elementos por busqueda o se crean ",
            "parameters": item.parametersOfPutOrCreate,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + 'findAndUpdate/'] = {};
        swaggerBaseJSON.paths[item.path + 'findAndUpdate/']["put"] = {
            "x-swagger-router-controller": family,
            "operationId": "putfac_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se actualiza el documento por busqueda  ",
            "parameters": item.parametersOfPutFindOrUpdate,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + 'one/'] = {};
        swaggerBaseJSON.paths[item.path + 'one/']["get"] = {
            "x-swagger-router-controller": family,
            "operationId": "getID" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se obtiene un documento por busqueda  ",
            "parameters": item.parametersOfGetOne,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + '{id}/'] = {};
        swaggerBaseJSON.paths[item.path + '{id}/']["get"] = {
            "x-swagger-router-controller": family,
            "operationId": "getid_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se obtiene un documento por id  ",
            "parameters": item.parametersOfGetOneById,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + '{id}/']["delete"] = {
            "x-swagger-router-controller": family,
            "operationId": "Delete_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se obtiene un documento por id  ",
            "parameters": item.parametersOfPutById,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
        swaggerBaseJSON.paths[item.path + '{id}/']["put"] = {
            "x-swagger-router-controller": family,
            "operationId": "putis_" + family + i,
            "tags": [
                family
            ],
            "description": "Con esta ruta se obtiene un documento por id  ",
            "parameters": item.parametersOfDeleteById,
            "responses": {
                "200": {
                    "description": "Regresa un elmento de " + item.path,
                    "examples": {
                        "application/json": c200
                    }
                },
                "403": {
                    "description": "Error",
                    "examples": {
                        "application/json": c403
                    }
                },
                "404": {
                    "description": "Error",
                    "examples": {
                        "application/json": c404
                    }
                },
                "500": {
                    "description": "Error",
                    "examples": {
                        "application/json": c500
                    }
                }
            }
        };
    }

    for (var [key, value] of Object.entries(manualPaths)) {
        swaggerBaseJSON.paths[key] = value
    }


    fs.writeFile(dir_, JSON.stringify(swaggerBaseJSON), 'utf-8', function (err) {
        if (err) {
            console.error(err);
            return err
        }

    });

    return 0;
}
module.exports = swaggerConstructor;