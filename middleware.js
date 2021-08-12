// redirect to login page if user is not logged in
const redirectToLogin = (req, res, next) => {
	if (!req.session.user_id) {
		console.log("No userId, redirecting to login")
		res.clearCookie("session_id")
		res.redirect("/login")
	} else {
		next()
	}
}

// redirect to home page if user is logged in
const redirectToHome = (req, res, next) => {
	if (req.session.user_id) {
		console.log("userId exists, redirecting to home")
		res.redirect("/home")
	} else {
		next()
	}
}


module.exports = { redirectToLogin, redirectToHome }

