'use strict'
var mongoose = require('mongoose');
const welcome = require('../models/messageWelcome.model');

function newWelcomeMessage(mensaje) {
    return new Promise((resolve, reject) => {

        let mensajeSave = new welcome()
        mensajeSave.active = true
        mensajeSave.title = mensaje.mensaje
        mensajeSave.description = mensaje.description
        mensajeSave.image = mensaje.image
        mensajeSave.type = mensaje.type
        mensajeSave.order = mensaje.order
        mensajeSave.save((err, mesajeSaved) => {
            if (err)
                reject(null)
            else {
                if (mesajeSaved)
                    resolve(mesajeSaved)
                else
                    reject(null)
            }
        })

    })
}



module.exports = { newWelcomeMessage }