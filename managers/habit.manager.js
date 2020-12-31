'use strict'
var mongoose = require('mongoose');
const habit = require('../models/habit.model');
const habitUser = require('../models/habitUser.model');
const task = require('../helpers/task');



function updateHabitUser(idHabit, paramers) {
    return new Promise((resolve, reject) => {
        let updateQuery = {};
        updateQuery = paramers
        habitUser.findByIdAndUpdate(idHabit, { $set: updateQuery }, { new: true }, (err, respuesta) => {
            if (err)
                reject(null)
            else {
                if (respuesta)
                    resolve(respuesta)
                else
                    resolve(null)
            }
        })
    })
}

function SethabitUser(idUser, idHabit) {
    return new Promise((resolve, reject) => {
        let date = task.getDate(1)
        habitoUsuario = new habitUser()
        habitoUsuario.dateCreated = parseInt(date)
        habitoUsuario.status = 'init'
        habitoUsuario.idUser = idUser
        habitoUsuario.idHabit = idHabit
        habitoUsuario.save((err, habitUserSaved) => {
            if (err)
                reject(null)
            else {
                if (habitUserSaved)
                    resolve(habitUserSaved)
                else
                    resolve(null)
            }
        })
    })
}

function getHabitFilter(pilar, level) {
    return new Promise((resolve, reject) => {
        habit.find({ pillar: pilar, level: level }, (err, habitos) => {
            if (err) {
                console.log(err)
                reject(null)
            }
            else {
                if (habitos)
                    resolve(habitos)
                else
                    resolve(null)
            }
        })
    })
}

function getAllHabits() {
    return new Promise((resolve, reject) => {
        habit.find({ active: true }, (err, habits) => {
            if (err) {
                console.log('error' + err)
                reject(null)
            }
            else {
                if (habits)
                    resolve(habits)
                else
                    resolve(null)
            }
        })
    })
}

function setNewHabit(habit) {

    return new Promise((resolve, reject) => {
        let date = task.getDate(1)
        let habito = new habit()
        habito.dateCreated = parseInt(date)
        habito.active = true
        habito.title = habit.title
        habito.description = habit.description
        habito.level = habit.level
        habito.pillar = habit.pillar
        habito.conversation = habit.conversation
        habito.picture = habit.picture
        habito.save((err, habitSaved) => {
            if (err)
                reject(null)
            else {
                if (habitSaved)
                    resolve(habitSaved)
                else
                    resolve(null)
            }
        })
    })

}

function updateHabit(id, paramers) {

    return new Promise((resolve, reject) => {
        let updateQuery = {};
        updateQuery = paramers
        habit.findByIdAndUpdate(id, { $set: updateQuery }, { new: true }, (err, respuesta) => {
            if (err)
                reject(null)
            else {
                if (respuesta)
                    resolve(respuesta)
                else
                    resolve(null)
            }
        })
    })
}

module.exports = { setNewHabit, getAllHabits, getHabitFilter, updateHabit, SethabitUser, updateHabitUser }