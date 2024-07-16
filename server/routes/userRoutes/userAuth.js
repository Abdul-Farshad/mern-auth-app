const express = require("express");
const router = express.Router();
const { userSignup, userSignin, userSignout} =
  require("../../controllers/user/userAuthController");

// Sign up
router.post("/signup", userSignup);
// Sign in
router.post("/signin", userSignin);
// Sign out
router.get("/signout", userSignout)
module.exports = router;
