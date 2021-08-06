const express = require("express")
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {

    db.any("SELECT * FROM schedtable;")
        .then((schedtabledata) => {
            res.render('pages/schedules', {
                schedules: schedtabledata
            })
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
})

//for specific schedules
router.get('/schedules/:id', (req, res) => {
    const id = req.params.id
    const error = '404 Page cannot be displayed'



    db.any("SELECT * FROM schedtable;")
        .then((scheddata) => {
            if (id < scheddata.length) {
                res.render('pages/schedulesid', {
                    schedulesid: scheddata[id],
                })
            }
            else if (id == 'new') {
                db.any("SELECT * FROM usertable;")
                    .then((datausers) => {
                        res.render('pages/schedulesnew', {
                            newUserData: datausers,
                            newSchedules: scheddata
                        })
                    })

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

//for specific schedules for each users

router.get('/users/:id/schedules', (req, res) => {
    const newSched = []
    const userId = req.params.id
    const error = '404 Page cannot be displayed'

    db.any("SELECT * FROM schedtable;")
        .then((scheddatatable) => {
            for (let i = 0; i < scheddatatable.length; i++) {
                if (userId == scheddatatable[i].user_id) {
                    newSched.push(scheddatatable[i])
                }
            }
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })


    db.any("SELECT * FROM usertable;")
        .then((userdata) => {
            if (newSched.length == 0 || userId > userdata.length) {
                res.render('pages/error', {
                    errorid: error
                })
            } else {
                res.render('pages/useridsched', {
                    newSchedId: newSched
                })
            }

        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
    })
//Add new schedule
router.post('/schedules', (req, res) => {
    const newSched = req.body

    db.none("INSERT INTO schedtable(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);", [newSched.user_id, newSched.day, newSched.start_at, newSched.end_at])
        .then(() => {
            res.redirect('/schedules')
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            }
            )
        })
})



module.exports = router