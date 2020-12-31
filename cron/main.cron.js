'use strict'
/**
 * V1.0 Diego Rivas
 * Archivo donde se colocan los cronJobs del negocio por temporalidad
 */




var cron = require('node-cron');
var moment = require('moment');

let deleteNonActiveUser = require('./functions/deleteNonActiveUsers.cronFunction')

// Diariamente a las 0 Horas 0 minutos
cron.schedule('0 0 * * *', () => {
    console.info(moment().format(), 'Inicia Cron remueve usuarios no activos')
    deleteNonActiveUser()
    console.info(moment().format(), 'Finalizo Cron remueve usuarios no activos')
});