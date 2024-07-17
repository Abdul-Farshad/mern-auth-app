const express = require("express")
const router = express.Router()
const verifyAdmin = require("../../utils/verifyAdmin")
const fetchUsers = require("../../controllers/admin/fetchUsersController")
const deleteUser = require("../../controllers/admin/deleteUserController")
const editUser = require('../../controllers/admin/editUserDataController')
const addNewUser = require('../../controllers/admin/addnewUserController')


// get all users data
router.get("/fetch-users", verifyAdmin, fetchUsers);
// delete user form dashboard
router.delete("/delete-user/:id", verifyAdmin, deleteUser);
// Edit user data
router.put('/edit-user/:id',verifyAdmin, editUser);
// Add new User
router.post('/add-user',verifyAdmin, addNewUser);

module.exports = router;