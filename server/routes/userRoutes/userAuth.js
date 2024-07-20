const express = require("express");
const router = express.Router();
const { userSignup, userSignin, userSignout, checkUserAuth} =
  require("../../controllers/user/userAuthController");
const verifyUser = require('../../utils/verifyUser');

// Sign up
router.post("/signup", userSignup);
// Sign in
router.post("/signin", userSignin);
// Sign out
router.get("/signout", userSignout);
// check user auth
router.get('/check-auth', verifyUser, checkUserAuth);
module.exports = router;
