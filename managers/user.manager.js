'use strict'
var mongoose = require('mongoose');
const user = require('../models/user.model');
const code = require('../models/code.model');
const welcome = require('../models/messageWelcome.model');
const curseuser = require('../models/curseUser.model');
const bcrypt = require('bcrypt');
const task = require('../helpers/task.helper');
const saltRounds = 10;



function updateCode(id) {
    return new Promise((resolve, reject) => {
        code.findByIdAndUpdate(id, { active: false }, (err, codeUpdated) => {
            if (err)
                reject(null)
            else {
                user.findByIdAndUpdate(codeUpdated.idUser, { status: 'active' }, async (err, userUpdate) => {
                    if (userUpdate) {
                        resolve(userUpdate)
                    }
                    else if (err)
                        reject(null)
                })
            }
        })
    })
}

function getUserFromCode(codigo) {
    return new Promise((resolve, reject) => {
        code.findOne({ code: codigo, active: true }, function (err, codeFounded) {
            console.log(codeFounded)
            if (err)
                reject(err)
            else if (codeFounded) {
                resolve(codeFounded)
            }
            else
            resolve(null)
        })
    })
}

function setCodeValidation(user) {
    return new Promise((resolve, reject) => {
       let date = task.getDate(1)//.then(date =>{
        bcrypt.genSalt(saltRounds, function (error, salt) {
            bcrypt.hash(user._id + '_' + date, salt, function (err, hash) {
                console.log(hash, date,'-------------------')
                let codigoGen = hash                
                let codigo = new code()
                codigo.active = true,
                    codigo.dateCreated = date.toString()
                codigo.code = codigoGen
                codigo.idUser = user._id
                codigo.save((err, codeSaved) => {
                    if (err) {
                        //res.status(500).send({messagge: err})
                        reject(err)
                    }
                    else {
                        console.log(codeSaved,'')
                        resolve(codigoGen)
                    }

                });
            });


        })
  //  })
    })
}


function setCodeChangePass(idUser){
    return new Promise((resolve, reject)=>{
    let date = task.getDate(2).split('/')
    console.log(date[0],'fecha split codigo')
    let dayHour = date[2].split(' ')

    let lastId = idUser.toString().substring((idUser.toString().length -3), idUser.toString().length)
    let hour = dayHour[1].split(':')
    
    let codigo = new code()
                codigo.active = true,
                codigo.dateCreated = date.toString()
                codigo.code = date[0]+''+hour[0]+''+lastId
                codigo.idUser = idUser
                codigo.save((err, codeSaved) => {
                    if (err) {
                        //res.status(500).send({messagge: err})
                        reject(err)
                    }
                    else {
                        
                        resolve( date[0]+''+hour[0]+''+lastId)
                    }

                });
    
})
.catch((err)=>{ 
    console.log(err)
    reject(err)
})
}

function getIfResolveTest(idUser){
    console.log(idUser)
    return new Promise((resolve, reject)=>{
         curseuser.findOne({ idUser: idUser.toString() }, function(error, userCurseFound){
            if(error)
            reject(error)
            else{
                if(userCurseFound){
                    resolve(true)
                }
                else
                resolve(false)
            }


         })
    })
}

function getMessageWelcome(typeMessage) {
    return new Promise((resolve, reject) => {
        welcome.find({ active: true, type: typeMessage }, function (err, mensaje) {
            if (err)
                reject(null)
            else {
                if (mensaje)
                    resolve(mensaje)
                else
                    reject(null)
            }
        })
    })
}


module.exports = { getIfResolveTest, setCodeValidation, getUserFromCode, updateCode, getMessageWelcome, setCodeChangePass }