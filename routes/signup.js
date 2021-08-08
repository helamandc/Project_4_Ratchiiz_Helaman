const express = require("express")
const router = express.Router()
const db = require('../database')

router.get("/", (req, res) => {
    res.render("pages/signup")
})

module.exports = router