const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require('../../controllers/admin/auth'); // require functions from admin controller

router.post("/register", register); // admin register route
router.post("/login", login); // admin login route

module.exports = router;