const express = require("express")
const router = express.Router();
const {adminSigin} = require('../../controllers/admin/adminAuthController')

//admin sign in
router.post('/signin', adminSigin)


module.exports  = router;