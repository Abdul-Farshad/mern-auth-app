const User = require('../../models/userModel');
const errorHandler = require('../../utils/error')
const deleteUser = async (req, res, next) => {
    
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({message: "User account has been deleted successfully"});
    } catch (err) {
        console.log("deleting error: ", err)
        next(err)
    }
}

module.exports = deleteUser;