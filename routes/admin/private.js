const express = require("express");
const router = express.Router();
const {protect} = require("../../middlewares/adminAuth");

const {
    insertInstructor,
    getModules,
    getExecuteModules
} = require("../../controllers/admin/private"); // require functions from admin controller

router.route("/insert").post(protect, insertInstructor); // admin add instructor route
router.route("/getModules").get(protect, getModules); // admin get enum modules route
router.route("/getExecuteModules/:className").get(protect, getExecuteModules); // admin get enum modules related to a class route

module.exports = router;