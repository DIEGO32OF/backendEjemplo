'use strict'


const jwt = require('jsonwebtoken')
const fs = require('fs')
const client = require('../models/client.model');


var privateKEY = fs.readFileSync('middleware/private.key', 'utf8')
var publicKEY = fs.readFileSync('middleware/public.key', 'utf8')

exports.sign = function (payload, audience) {
    console.log('* * **  *', audience)
    var signOptions = {
        audience: audience,
        expiresIn: "60d",
        algorithm: "RS256"
    };
    return jwt.sign(payload, privateKEY, signOptions);

}


exports.verify = function (req, res, next) {

    var verifyOptions = {
        audience: 'app',
        expiresIn: "60d",
        algorithm: ["RS256"]
    };

    try {
        var token = req.headers.authorization.toString().split(' ')//.replace(/['"]+g/,'');

        let correct = jwt.verify(token[1], publicKEY, verifyOptions)

        if (correct.clientId != undefined) {
            let myClient = client.findById(correct.clientId)
            myClient.populate('user').exec((err, userFound) => {
                if (err) {
                    res.status(500).send({errAuth: err})
                } else {
                    console.log(userFound)
                    req.user = userFound
                    req.clientId = correct.clientId
                }

                next()
            })
        }
        /*  else
         res.status(500).send({errAuth: 'Usuario no encontrado'}) */
    } catch (err) {
        res.status(500).send({errAuth: err})
    }

},
    exports.decode = function (token) {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
// }