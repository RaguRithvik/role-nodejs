const express = require("express");
const router = express.Router()
const { createUsers, loginUser } = require("../controller/usersController")

//Router
router.route("/create").post(createUsers)
router.route("/login").post(loginUser)

module.exports = router