const User = require('../../models/userModel');
const errorHandler = require('../../utils/error')
const deleteUserAccount = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can delete only your account"));
    }
    
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({message: "Your account has been successfully deleted"});
    } catch (err) {
        console.log("deleting error: ", err)
        next(err)
    }
}


module.exports = deleteUserAccount;