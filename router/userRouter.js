const express = require("express");
const router = express.Router()
const { createUsers, loginUser, getUsers } = require("../controller/usersController")
const Protected = require("../middleware/protected")
//Router
router.route("/create").post(createUsers)
router.route("/login").post(loginUser)
router.route("/get-users").get(Protected, getUsers)

module.exports = router