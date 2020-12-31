'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var moment = require('moment')
const path = require('path');
const fs = require('fs')
let config = require('./config/general.config')
const fileUpload = require('express-fileupload');

if (config.active_log_file) {
// se reemplaza defalt console functions
    const _privateLog = console.log;
    const _privateError = console.error;
    const _privateInfo = console.info;
    const _privateWarn = console.warn;
    const _privateDebug = console.debug;

    let customLogFile = function (args, action) {
        if (!action) {
            action = 'LOG: '
        }
        let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/habits_ai.log'), {flags: 'a'});
        streamLogFile.end(action + moment().format('YYYY-MM-DD h:mm:ss a') + '  ' + JSON.stringify(args) + '\r\n')
    }

    console.log = function (message) {
        _privateLog.apply(console, arguments);
        customLogFile(arguments, 'LOG: ');
    };
    console.error = function (message) {
        _privateError.apply(console, arguments);
        customLogFile(arguments, 'ERROR: ');
    };
    console.info = function (message) {
        _privateInfo.apply(console, arguments);
        customLogFile(arguments, 'INFO: ');
    };
    console.warn = function (message) {
        _privateWarn.apply(console, arguments);
        customLogFile(arguments, 'WARN: ');
    };
    console.debug = function (message) {
        _privateDebug.apply(console, arguments);
        customLogFile(arguments, 'DEBUG: ');
    };

    const morgan = require('morgan');

    app.use(morgan(function (tokens, req, res) {
        let cadenamorgan = [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            //tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join('  ');

        customLogFile(cadenamorgan, 'REQUEST: ')
        return cadenamorgan;
    }));
}


var responseCodes = require('./helpers/respoonse_codes.helper')
var swaggConstructor = require('./helpers/swagger_doc_generator.helper')


var language = require('./routes/language.routes');
var languageElements = require('./routes/languageElements.routes');

var kindOFChallenge = require('./routes/kindOfChallenge.routes');
var categoryOFChallenge = require('./routes/categoryOfChallenge.routes');
var teamForChallenge = require('./routes/teamForChallenge.routes');
var challenge = require('./routes/challenge.routes');
var points = require('./routes/userPointsLog.routes');
var progressChallenge = require('./routes/challenge_progress.routes');

app.use(fileUpload({
    preserveExtension: true,
    safeFileNames: true,
    responseOnLimit: 'The file limit has been reached',
    limits: {fileSize: config.max_fileSize_mb * 1024 * 1024}
}));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
//app.use(express.static('public'));
app.use('/apidoc', express.static('apidoc'));

/**
 * @apidefine apihabits
 * @apitype {createApplication}
 */


//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});

//rutas base


app.use('/api', language);
app.use('/api', languageElements);
app.use('/api', kindOFChallenge);
app.use('/api', categoryOFChallenge);
app.use('/api', teamForChallenge);
app.use('/api', challenge);
app.use('/api', points);
app.use('/api', progressChallenge);
app.use('/api', require('./routes/fileGCS.routes'));


//Sawgger

swaggConstructor();

app.use('/', require('./helpers/swagger_doc.helper'));

// inicio
app.get('/', async (req, res) => {
    let response = await responseCodes.getErrorByCode(403);
    res.status(403).json(response)
})

module.exports = app;