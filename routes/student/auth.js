const express = require("express");
const router = express.Router();

const {
    login
} = require('../../controllers/student/auth'); // require functions from student controller

router.post("/login", login); // student login route

module.exports = router;