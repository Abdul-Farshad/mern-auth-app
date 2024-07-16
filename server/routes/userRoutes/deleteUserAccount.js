const express = require("express");
const router = express.Router();
const verifyUser = require("../../utils/verifyUser")
const deleteUserAccount = require('../../controllers/user/deleteUserAccountController')

router.delete('/delete/:id', verifyUser, deleteUserAccount)

module.exports = router;
