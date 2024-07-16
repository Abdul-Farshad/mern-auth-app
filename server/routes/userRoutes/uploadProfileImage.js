const express = require("express");
const router = express.Router();
const uploadProfileImage = require("../../controllers/user/uploadProfileImageController");
const verifyUser = require('../../utils/verifyUser')

//-------------------------------------------------------------------------------------------------


// new profile upload route
router.post("/profile-image/:id", verifyUser, uploadProfileImage);

module.exports = router;
