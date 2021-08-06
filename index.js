require('dotenv').config()
const express = require('express')
const data = require('./data')

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


//Port specified
const PORT = process.env.PORT

//ROUTES
//Part 1


const userRoute = require("./routes/user")
app.use('/users', userRoute)
//for specific users
//app.use('/', userRoute)

//all schedules
const schedRoute = require("./routes/schedule")
app.use('/', schedRoute)
app.use('/schedules', schedRoute)


//all users





//Making sure that we are connected to a local host
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


