
'use strict'

const manager = require('../managers/activity.manager')




function setMessageWelcom(req, res) {
    let message = req.body
    manager.newWelcomeMessage(message).then((mensaje) => {
        if (mensaje === null)
            res.status(500).send({ err: 'No se inserto el nuevo mensaje' })
        else
            res.status(200).send({ message: mensaje })
    })
}





module.exports = {  setMessageWelcom }