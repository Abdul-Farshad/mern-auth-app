const express = require("express");
const router = express.Router();
const test = require("../../controllers/user/userController");

router.get("/", test);

module.exports = router;