const express = require("express")
const router = express.Router();
const {adminSigin ,adminSignOut} = require('../../controllers/admin/adminAuthController')
const verifyAdmin = require("../../utils/verifyAdmin")

//admin sign in
router.post('/signin', adminSigin)
// admin sign out
router.get('/signout', adminSignOut)
// auth check 
router.get("/check-auth", verifyAdmin, (req, res) => {
    if (req.admin) return res.status(200).json({success: true})
})

module.exports  = router;