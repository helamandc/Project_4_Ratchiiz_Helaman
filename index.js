
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const db = require('./database')
const app = express()

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//EJS config
app.set('view engine', 'ejs')
app.set('views', './views')

//set 'public' folder as static folder
app.use(express.static('./public'))

const session = require("express-session")
const twohours = 1000 * 60 * 60 * 2
app.use(
	session({
		name: "session_id",
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false /* Forces a session that is "uninitialized" to be saved to the store.  */,
		cookie: { maxAge: twohours },
		resave: false /* Forces the session to be saved back to the session store, even if the session was never modified during the request. */,
	})
)

//Port specified
const PORT = process.env.PORT

//ROUTES
//Part 1

const userRoute = require("./routes/user")
app.use("/userinfo", userRoute)

//all schedules
const homeRoute = require("./routes/home")
app.use("/home", homeRoute)

//Add new schedule
const schedRoute = require("./routes/schedule")
app.use("/newschedule", schedRoute)

//login route
const loginRouter = require("./routes/login")
app.use("/login", loginRouter)

//logout route
const logoutRouter = require("./routes/logout")
app.use("/logout", logoutRouter)

const signupRouter = require("./routes/signup")
app.use("/signup", signupRouter)

const welcomeRouter = require("./routes/welcome")
app.use("/", welcomeRouter)

//Making sure that we are connected to a local host
app.listen(PORT, () => {
	console.log(`App is listening at http://localhost:${PORT}`)
})
