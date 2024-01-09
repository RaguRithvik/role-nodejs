const express = require("express");
const router = express.Router()
const { getEmployee, createEmployee, updateEmployee, deleteEmployee } = require("../controller/employeeController")
const Protected = require("../middleware/protected")
const { imgDocUpload } = require("../middleware/imgDocUpload")

router.route("").post(Protected, imgDocUpload, createEmployee).get(Protected, getEmployee).delete(Protected, deleteEmployee).put(Protected, imgDocUpload, updateEmployee)

module.exports = router;
