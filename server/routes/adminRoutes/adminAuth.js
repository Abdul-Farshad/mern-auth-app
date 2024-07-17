const express = require("express")
const router = express.Router();
const {adminSigin ,adminSignOut} = require('../../controllers/admin/adminAuthController')

//admin sign in
router.post('/signin', adminSigin)
// admin sign out
router.get('/signout', adminSignOut)

module.exports  = router;