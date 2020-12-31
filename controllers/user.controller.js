'use strict'
var mongoose = require('mongoose');
const user = require('../models/user.model');
const conversation = require('../models/conversation.model');
const client = require('../models/client.model');
const company = require('../models/company.model');
const axios = require('axios');
var md_Auth = require('../middleware/auth.middleware');
const bcrypt = require('bcrypt');
const task = require('../helpers/task.helper');
const mail = require('../helpers/mail.helper');
const template = require('../helpers/template.helper');
const saltRounds = 10;
const manager = require('../managers/user.manager')
const saveFile = require("../helpers/saveFile.helper")
//const myPlaintextPassword = 'app';

let basicCrudConstructorHelper = require('./../helpers/basicCrudConstructor.helper')


const hostURLAPI = "https://backendreact2.herokuapp.com/api/";

function anotherGeneric(req, res) {
}

function generico(req, res) {
    var pickedUser = "JZLpeA4pBECwbc5IAAAA";
    try{
    var io = req.app.get('socketio');    
        console.log('connected 2');        
        io.emit('test', JSON.stringify(req.body));

}
catch(err){
    console.log(err)
}
  /*   let params = req.body
    console.log(req.file, '................')
    saveFile.saveFileFB(req.file).then((ruta) => {
        console.log(ruta)
        saveFile.deleteFile(req.file.path)
        //guardar o actualizar la coleccion necesaria para ponerle la imagen
        res.status(200).send({message: true})
    })

    /* getUserMail(params.mail).then(response =>{
        console.log(response)
    }) */

    /*  bcrypt.genSalt(saltRounds, function(err, salt) {
         bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
             // Store hash in your password DB.
             console.log(hash)
         });
     }); */
    /*  for(const racha of params){
       user.findOneAndUpdate({_id: racha.idMgDB}, {racha: racha.racha_actual}, (err, respuesta) => {
           
         })
      } */
    /*     let payload = {
        clientId  : '5e681ae6b54100551c9faa91',
        rol: 'Admin',
        client : params.audience
    
    }
          let audience = params.audience
          bcrypt.compare('app', audience).then(function(result) {
     
            if(result){
          let token =  md_Auth.sign(payload, audience)
          res.status(200).send({Token: token}) 
        }
      else
      res.status(403).send({message: 'No Auth'})
          })  */

}

function saveConversation(req, res) {
    let param = req.body
    let convSave = new conversation()
    convSave.advanced = param.advanced
    convSave.basic = param.basic
    convSave.intermediate = param.intermediate
    convSave.change_habit = param.change_habit
    convSave.n_conversation = param.n_conversation
    convSave.points = param.points
    convSave.notification = param.notification
    convSave.pillar = convSave.pillar
    convSave.next_advanced = param.next_advanced
    convSave.next_intermediate = param.next_intermediate
    convSave.next_basic = param.next_basic
    convSave.save((err, conversationSaved) => {
        if (err)
            res.status(500).send({message: err})
        else if (conversationSaved)
            res.status(200).send({convesation: conversationSaved})
    })
}

function getUser(req, res) {
    let param = req.body
    user.findById(param.idUser, function (err, userFound) {
        if (err)
            res.status(500).send({message: err})
        else if (userFound) {
            res.status(200).send({user: userFound})
        }

    })

}

function getConversationByUser(req, res) {
    let params = req.body

    let arrayUsers = params.users.map(u => u.idMgDB)
    console.log(arrayUsers)

    let arrResult = []
    let result = []
    user.find({_id: {$in: arrayUsers}}, function (err, userFounded) {
        if (err)
            res.status(404).send({message: err})
        else {

            userFounded.map(m => {

                let uidFilter = params.users.filter(p => p.idMgDB == m._id).map(m => m.uid)
                console.log(m._id, uidFilter)
                if (m.conversation != '') {

                    conversation.findOne({$or: [{basic: m.conversation}, {intermediate: m.conversation}, {advanced: m.conversation}]}, function (myerr, conversations) {
                        if (err)
                            res.status(500).send({message: err})
                        else {
                            if (conversations) {
                                let myConversation = conversations._doc
                                let level = Object.keys(myConversation).find(key => myConversation[key] === m.conversation)
                                let mensaje = myConversation.notification[level]
                                let nextConversation = ''
                                switch (level) {
                                    case 'basic':
                                        nextConversation = myConversation.next_basic
                                        break
                                    case 'intermediate':
                                        nextConversation = myConversation.next_intermediate
                                        break
                                    case 'advanced':
                                        nextConversation = myConversation.next_advanced
                                        break

                                }

                                arrResult.push({
                                    currentConv: m.conversation,
                                    status: m.conversationStatus,
                                    nextConv: nextConversation,
                                    estatusConv: m.conversationStatus,
                                    idMgDB: m._id,
                                    uid: uidFilter[0],
                                    nivel: level,
                                    mensajes: mensaje,
                                    change_habit: myConversation.change_habit,
                                    n_conversation: myConversation.n_conversation
                                })
                                //console.log(arrResult, 46)
                            }
                        }
                    })

                }

            })

            setTimeout(() => {
                res.status(200).send({conversations: arrResult})
            }, 1000);

        }
    })
}

function getUserMail(mail) {
    return new Promise((resolve, reject) => {
        user.findOne({mail: mail}, function (err, userFound) {
            if (err)
                reject(null)
            //res.status(500).send({message: err})
            else if (userFound) {
                resolve(userFound)

                //res.status(200).send({user: userFound})
            } else
                resolve(null)

        })
    })

}

function saveUser(req, res) {

    let params = req.body
    let audience = params.audience
    let date = task.getDate(1)

    bcrypt.compare('app', audience, function (err, result) {

        if (result) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(params.pass, salt, function (err, hash) {
                    // Store hash in your password DB.


                    getUserMail(params.mail).then(response => {
                        if (response == null) {
                            let saveUser = new user()
                            saveUser.wellness = params.wellness
                            saveUser.tester = params.tester
                            saveUser.steps_goal = params.steps_goal
                            saveUser.seven_days = params.seven_days
                            saveUser.status = 'inactive'//params.status
                            saveUser.rol = params.rol
                            saveUser.points = params.points
                            saveUser.picture = params.picture
                            saveUser.old_week = params.old_week
                            saveUser.name_first = params.name_first
                            saveUser.name = params.name
                            saveUser.mail = params.mail
                            saveUser.last_name_first = params.last_name_first
                            saveUser.last_name = params.last_name
                            saveUser.lenguage = params.lenguage
                            saveUser.gender = params.gender
                            saveUser.diet = params.diet
                            saveUser.racha = params.racha
                            saveUser.daily = params.daily
                            saveUser.conversation = params.conversation
                            saveUser.conversationStatus = params.conversationStatus
                            saveUser.create_date = date.toString()//params.create_date
                            saveUser.cell_phone = params.cell_phone
                            saveUser.born_date = params.born_date
                            saveUser.company = params.company
                            saveUser.filtros = params.filtros
                            saveUser.pass = hash
                            saveUser.save((err, userSaved) => {
                                if (err) {
                                    res.status(500).send({messagge: err})
                                } else {
                                    // crea cliente

                                    let cliente = new client()
                                    cliente.idUser = userSaved._id
                                    cliente.dateCreated = date.toString()
                                    cliente.active = true
                                    cliente.save((error, clientSaved) => {
                                        if (error)
                                            res.status(500).send({messagge: error})
                                        else {
                                            let payload = {
                                                clientId: clientSaved._id,
                                                rol: 'app'

                                            }
                                            // let token =  md_Auth.sign(payload, audience)
                                            //envio de correo aqui
                                            SendEmailValidation(userSaved).then((respuesta) => {
                                                console.log(respuesta)
                                                res.status(200).send({user: userSaved.name, sendMail: respuesta})
                                            })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                        }
                                    })


                                }
                            })
                        } else {
                            res.status(500).send({message: 'Correo ya existente'})
                        }
                    })
                });
            });
        } else
            res.status(403).send({message: 'No Auth'})
    })

}

function vfLink(req, res) {

    let link = req.query.link
    console.log('entraa', link)
    manager.getUserFromCode(link).then((codigo) => {
        console.log(codigo)
        if (codigo == null)
            return res.status(200).send(template.htmlExpired);

        let dateToday = parseInt(task.getDate(1))
        if ((parseInt(codigo.dateCreated) - dateToday) >= 15)
            return res.status(200).send(template.htmlExpired);
        else {
            manager.updateCode(codigo._id).then((user) => {

                if (user != null)
                    return res.status(200).send(template.htmlAprobed);
                else
                    return res.status(200).send(template.htmlExpired);
            })
        }
    })
        .catch((err) => {
            console.log(err)
        })
}

function SendEmailValidation(user) {
    return new Promise((resolve, reject) => {
        let param = user
        if (param.status == 'inactive') {
            manager.setCodeValidation(param).then((code) => {

                let templates = template.emaiVef(hostURLAPI, code)
                mail.sendMail(param.mail, 'Nuevo Usuario', templates, [], null).then((data) => {
                    resolve(data)
                })
            })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            resolve(2)
        }
    })

}

function changePass(req, res){
    let param = req.body
    getUserMail(param.mail).then((user) =>{
        if(user != null){
            sendMailChangePass(user).then((code)=>{
                res.status(200).send({message: 'Cambio de contraseña', status: 200, succes: true, data: code}) 
            }).catch((err)=>
            {
                console.log(err)
                res.status(503).send({message: 'Error generacion de codigo', status: 503, succes: false, error: err}) 
            })
        }
        else
        res.status(404).send({message: 'Correo no encontrado', status: 404, succes: false, error: 'Correo no encontrado'})
    })
}

function sendMailChangePass(user){
    return new Promise((resolve,reject)=>{
        manager.setCodeChangePass(user._id).then((code)=>{
            let templateChange = template.changePass(code)
            mail.sendMail(user.mail, 'Cambio Contraseña Habits', templateChange,[], null).then((data)=>{
                resolve(code)
            })
        })
        .catch((err)=>{console.log(err)})
    })
}

function login(req, res) {

    let params = req.body
    let audience = params.audience

    bcrypt.compare('app', audience, function (err, result) {

        if (result) {
            getUserMail(params.mail).then(response => {


                if (response != null) {
                    if (response.status == 'active') {
                        bcrypt.compare(params.pass, response.pass, function (err, resultPass) {
                            if (resultPass) {
                                client.findOne({idUser: response._id}, function (errorr, clientFound) {
                                    if (errorr)
                                        res.status(500).send({message: errorr})
                                    else {                                        
                                        let payload = {
                                            clientId: clientFound._id,
                                            rol: 'app'

                                        }
                                        let token = md_Auth.sign(payload, 'app')

                                        manager.getMessageWelcome(1).then(function (arrMessage) {
                                            
                                            let index = Math.floor((Math.random() * (arrMessage.length - 1)))
                                             let message = arrMessage[index]
                                         
                                            manager.getMessageWelcome(2).then((messageBoard)=>{
                                         messageBoard = messageBoard.sort(function (a, b) { return a.order - b.order });
                                             manager.getIfResolveTest(response._id).then((isNew)=>{
                                                
                                                res.status(200).send({user: response.name, token: token, message: message, messageBoarding: messageBoard, resolvedTest: isNew})
                                        })
                                        } )
                                    })
                                  /*       .finally((isNew) => {
                                          
                                        })
                                        
                                        
                                        .catch((err) =>{ console.log(err) }) */
                                    }
                                })
                            } else
                                res.status(500).send({message: 'Contraseña incorrecta'})
                        })
                    } else
                        res.status(200).send({message: 'usuario no validadó'})
                } else {
                    res.status(500).send({message: 'Correo no existente'})
                }
            })
        } else
            res.status(403).send({message: 'No Auth'})
    })


}

function getPointsRacha(req, res) {
    let params = req.body

    user.findById(params.id, function (err, userFounder) {
        if (userFounder) {
            let racha = 1
            let points = 1
            let array = [29, 57, 85, 113]
            if (!array.includes(params.daily)) {
                if ((parseInt(params.daily) - parseInt(userFounder.daily)) === 1) {

                    racha = userFounder.racha + 1
                    if (racha > 3) {
                        points = parseInt(racha / 3)

                        if ((racha % 3) > 0)
                            points = points + 1
                    }

                    user.findByIdAndUpdate(params.id, {racha: racha, daily: params.daily}, async (err, userUpdate) => {
                        if (userUpdate) {
                            // await
                            if (params.rachaUser) {
                                params.rachaUser.pointsSum = points
                                console.log(params, '.......................................')
                                await sendRachaUser(params.rachaUser, params.timezoneUser, params.daily, params.id, params.uidUser, points)
                            }
                            res.status(200).send({puntos: points})
                        }
                    })
                } else {
                    if ((parseInt(params.daily) - parseInt(userFounder.daily)) > 1) {
                        user.findByIdAndUpdate(params.id, {racha: 1, daily: params.daily}, async (err, userUpdate) => {
                            if (userUpdate) {

                                if (params.rachaUser) {
                                    params.rachaUser.pointsSum = 1
                                    console.log(params, '.......................................')
                                    await sendRachaUser(params.rachaUser, params.timezoneUser, params.daily, params.id, params.uidUser, 1)
                                }
                                res.status(200).send({puntos: 1})
                            } else
                                res.status(404).send({puntos: 0})
                        })
                    } else {
                        //  user.update( {}, { daily: 0, racha:0}, { multi: true }, (err, userupdated) =>{
                        // console.log( err, userupdated)
                        res.status(200).send({puntos: 0})
                        // } )
                    }
                }
            } else {
                user.findByIdAndUpdate(params.id, {racha: 1, daily: params.daily}, async (err, userUpdate) => {
                    if (userUpdate) {
                        params.rachaUser.pointsSum = 1
                        await sendRachaUser(params.rachaUser, params.timezoneUser, params.daily, params.id, params.uidUser, 1)
                        res.status(200).send({puntos: 1})
                    }
                })
            }
        }
    })
}

function updateUser(req, res) {

    let paramers = req.body
    let idUser = paramers.idUser

    if(paramers.pass != undefined){
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(params.pass, salt, function (err, hash) {
            paramers.pass = hash
            })
        })
    }

    let updateQuery = {};
    updateQuery = paramers
    user.findOneAndUpdate({_id: idUser}, {$set: updateQuery}, {new: true}, (err, respuesta) => {
        if (err) {
            res.status(500).send({message: err})
        } else {

            res.status(200).send({user: respuesta})
        }
    })
}

async function sendRachaUser(rachaUser, timeZone, daily, id, uidUser, puntos) {
    const config = {
        headers: {Authorization: 'Bearer 400853ac-af63-4436-bdf8-9eea7494659d'}
    };

    const bodyParameters = {
        //"user_Racha":{
        "rachaUser": rachaUser,
        "timezoneUser": timeZone,
        "uidUser": uidUser,
        "id": id,
        "daily": daily
        //"pointsSum":puntos
        //   }

    };

    axios.post(
        'https://us-central1-habits-ai.cloudfunctions.net/app/updateRachaUser',
        bodyParameters,
        config
    ).then(resultset => {
        console.log(resultset.data)
        if (resultset.data.code)
            return resultset.data.code
        else
            resultset.data
    }).catch(console.log);
}

function updateProperties(req, res) {
    let paramers = req.body
    // id, type, ativityUser o userTest ....
    switch (paramers.type) {
        case 1:
            user.findByIdAndUpdate(paramers.id, {$push: {activityUser: paramers.activityUser}},
                (err, userUpdate) => {
                    res.status(200).send({user: userUpdate})
                })
            break;

        case 2:
            user.findByIdAndUpdate(paramers.id, {$push: {userTest: paramers.userTest}},
                (err, userUpdate) => {
                    res.status(200).send({user: userUpdate})
                })
            break;
        case 3:
            user.findByIdAndUpdate(paramers.id, {$push: {chat_bot_room: paramers.chat_bot_room}},
                (err, userUpdate) => {
                    res.status(200).send({user: userUpdate})
                })
            break;
        case 4:
            user.findByIdAndUpdate(paramers.id, {$push: {filtros: paramers.filtros}},
                (err, userUpdate) => {
                    res.status(200).send({user: userUpdate})
                })
            break;
    }
}


/* bCRUD*/

let populateObject = [{
    path: 'company',
    model: company
}];

var validationObject = {
    name: 'string,mandatory',
    email: 'number'
};
let getListOfUsers = basicCrudConstructorHelper.listAll(user, populateObject)


let createElement = basicCrudConstructorHelper.new(user, validationObject);
let updateOrCreate = basicCrudConstructorHelper.updateOrCreate(user, validationObject);

let getElementById = basicCrudConstructorHelper.oneById(user, populateObject);
let getOneElement = basicCrudConstructorHelper.oneBySearch(user, populateObject);
let updateElementById = basicCrudConstructorHelper.idUpdate(user, validationObject);
let findAndUpdateElement = basicCrudConstructorHelper.searchAndUpdate(user, validationObject, populateObject);
let findAndDeletById = basicCrudConstructorHelper.idDelete(user);


module.exports = {
    SendEmailValidation,
    login,
    generico,
    getUser,
    saveUser,
    updateProperties,
    getPointsRacha,
    updateUser,
    saveConversation,
    getConversationByUser,
    vfLink,
    getListOfUsers,
    createElement,
    updateOrCreate,
    getElementById,
    getOneElement,
    updateElementById,
    findAndUpdateElement,
    findAndDeletById,
    changePass
}
