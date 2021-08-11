const express = require("express")
const router = express.Router()
const db = require('../database')

//Login User information
router.get("/:id", (req, res) => {
    const displaySched = []

    if(req.params.id == req.session.user_id){
        db.any("SELECT usertable.id, usertable.firstname, usertable.lastname, usertable.email, schedtable.day, schedtable.start_at, schedtable.end_at FROM usertable, schedtable WHERE usertable.id = schedtable.user_id;")
        .then((usertabledata) => {
            for(i=0; i < usertabledata.length; i++){
                if(req.session.user_id == usertabledata[i].id){
                    displaySched.push(usertabledata[i])
                }
            }
                    res.render("pages/user", {
                        users: displaySched
                    })
            })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
    } else {
        db.any("SELECT usertable.id, usertable.firstname, usertable.lastname, usertable.email, schedtable.day, schedtable.start_at, schedtable.end_at FROM usertable, schedtable WHERE usertable.id = schedtable.user_id;")
        .then((usertabledata) => {
            for(i=0; i < usertabledata.length; i++){
                if(req.params.id == usertabledata[i].id){
                    displaySched.push(usertabledata[i])
                }
            }
                    res.render("pages/user", {
                        users: displaySched
                    })
            })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
    }
})

module.exports = router