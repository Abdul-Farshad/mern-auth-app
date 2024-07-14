const express = require("express");
const router = express.Router();
const { userSignup, userSignin } =
  require("../../controllers/user/userAuthController");

// Sign up
router.post("/signup", userSignup);
// Sign in
router.post("/signin", userSignin);

module.exports = router;
