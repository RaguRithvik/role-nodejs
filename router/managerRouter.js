const express = require("express");
const router = express.Router()
const { CreateManager, getManager, updateManager, deleteManager } = require("../controller/managerController")
const Protected = require("../middleware/protected")
const { imageUpload } = require("../middleware/imageUpload")
//Router
router.route("").post(Protected, imageUpload, CreateManager).get(Protected, getManager).delete(Protected, deleteManager).put(Protected, imageUpload, updateManager);

module.exports = router