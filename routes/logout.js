const express = require("express")
const router = express.Router()

//Delete stored cookie and redirect user to welcome page
router.get("/", (req, res) => {
	req.session.destroy(function (err) {
		if (err) {
			res.send(err.message)
		} else {
			res.clearCookie("session_id")
			res.redirect("/login")
		}
	})
})

module.exports = router
