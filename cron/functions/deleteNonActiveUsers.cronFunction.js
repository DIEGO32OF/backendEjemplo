'use strict'
let userModel = require('./../../models/user.model')
let moment = require('moment')

module.exports = async function () {

    try {
        let users = await userModel.find({status: 'inactive'});
        users.map(async function () {
            let rm_ = {}
            if (item.item.createdAt) {
                var reg_plus_5_date = moment(item.createdAt).add(5, 'days').format('x')
                var today_date = moment().format('x');
                if ((reg_plus_5_date - today_date) < 0 && item.status && item.status.toLowerCase() === 'inactive') {
                    rm_ = await users.findByIdAndDelete(item._id)
                }

            } else {
                /* if (item.status && item.status.toLowerCase() === 'inactive') {
                     rm_ = await users.findByIdAndDelete(item._id)
                 }*/
            }
            return rm_
        })
    } catch (e) {
        console.error('Error al elimiar no activos', e)
    }

}