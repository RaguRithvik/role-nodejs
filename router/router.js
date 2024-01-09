const express = require("express");
const router = express.Router()
router.use("/employee", require("./employeeRouter"));
router.use("/manager", require("./managerRouter"));
router.use("", require("./userRouter"));
module.exports = router