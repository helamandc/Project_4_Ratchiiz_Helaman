const express = require("express")
const router = express.Router()
const db = require('../database')

//const { redirectToLogin } = require("../middleware")

router.get("/", /*redirectToLogin,*/ (req, res) => {

    db.any("SELECT usertable.firstname, usertable.lastname, schedtable.day, schedtable.start_at, schedtable.end_at FROM usertable, schedtable WHERE usertable.id = schedtable.user_id;")
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