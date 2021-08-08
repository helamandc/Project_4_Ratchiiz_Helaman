const express = require("express")
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {

    db.any("SELECT usertable.firstname, usertable.lastname, schedtable.day, schedtable.start_at, schedtable.end_at FROM usertable, schedtable;")
        .then((schedtabledata) => {
            res.render('pages/home', {
                schedules: schedtabledata
            })
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
})


module.exports = router