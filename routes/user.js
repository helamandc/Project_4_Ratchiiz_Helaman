const express = require("express")
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcryptjs')


//all users
router.get('/', (req, res) => {
    db.any("SELECT * FROM usertable")
        .then((usertabledata) => {
            res.render('pages/users', {
                users: usertabledata
            })
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
})


//for specific users
router.get('/users/:id', (req, res) => {
    const id = req.params.id
    const error = '404 Page cannot be displayed'

    db.any("SELECT * FROM usertable;")
        .then((usertabledata) => {
            if (id < usertabledata.length) {
                res.render('pages/usersid', {
                    usersid: usertabledata[id],
                })
            }
            else if (id == 'new') {
                res.render('pages/usersnew')
            } else {
                res.render('pages/error', {
                    errorid: error
                })
            }
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })


})


module.exports = router