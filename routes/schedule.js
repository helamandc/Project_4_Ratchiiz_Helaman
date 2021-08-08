const express = require("express")
const router = express.Router()
const db = require('../database')


//Display the form
router.get("/", (req, res) => {
	res.render("pages/schedule" /*, {
		message: req.query.message,
	}*/)
})

//Add new schedule
router.post("/", (req, res) => {
    const newSched = req.body

    db.none("INSERT INTO schedtable(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);", [req.session.user_id, newSched.day, newSched.start_at, newSched.end_at])
        .then(() => {
            res.redirect('/userinfo')
        })
        .catch((err) => {
            res.render("pages/error", {
                errorid: err.message
            }
            )
        })
})



module.exports = router