const express = require("express")
const router = express.Router()
const db = require('../database')



//User information
router.get("/", (req, res) => {
    db.any("SELECT * FROM usertable;")
        .then((usertabledata) => {
                db.any("SELECT * FROM schedtable;")
                .then((schedtabledata) => {
                 //   if (usertabledata.id = 1) {
                    res.render("pages/user", {
                        users: usertabledata,
                        schedules: schedtabledata
                    })
             //   }

            })
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            })
        })
})


//for specific schedules for each users

// router.get('/users/:id/schedules', (req, res) => {
//     const newSched = []
//     const userId = req.params.id
//     const error = '404 Page cannot be displayed'

//     db.any("SELECT * FROM schedtable;")
//         .then((scheddatatable) => {
//             for (let i = 0; i < scheddatatable.length; i++) {
//                 if (userId == scheddatatable[i].user_id) {
//                     newSched.push(scheddatatable[i])
//                 }
//             }
//         })
//         .catch((err) => {
//             res.render("pages/error", {
//                 errorid: err.message
//             })
//         })


//     db.any("SELECT * FROM usertable;")
//         .then((userdata) => {
//             if (newSched.length == 0 || userId > userdata.length) {
//                 res.render('pages/error', {
//                     errorid: error
//                 })
//             } else {
//                 res.render('pages/useridsched', {
//                     newSchedId: newSched
//                 })
//             }

//         })
//         .catch((err) => {
//             res.render("pages/error", {
//                 errorid: err.message
//             })
//         })
//     })


module.exports = router