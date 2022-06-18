const express = require("express");
const router = express.Router();
const {protect} = require("../../middlewares/studentAuth");

const {
    getModules,
    getExecuteModules
} = require("../../controllers/student/private"); // require functions from student controller

router.route("/getModules/:stuName").get(protect, getModules); // student get enum modules route
router.route("/getExecuteModules/:className/:stuName").get(protect, getExecuteModules); // student get enum modules route related to a class

module.exports = router;