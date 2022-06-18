const express = require("express");
const router = express.Router();
const {protect} = require("../../middlewares/instructorAuth");

const {
    insertClassModule,
    getModules,
    getExecuteModules
} = require("../../controllers/instructor/private"); // require functions from instructor controller

router.route("/insert").post(protect, insertClassModule); // instructor create class and student list route
router.route("/getModules").get(protect, getModules); // instructor get enum modules list route
router.route("/getExecuteModules/:className").get(protect, getExecuteModules); // instructor get enum modules related to a class route

module.exports = router;