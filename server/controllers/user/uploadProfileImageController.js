const User = require("../../models/userModel");
const errorHandler = require("../../utils/error");

const uploadProfileImage = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account!"));
  }
  try {
    const {imageURL}  = req.body
    if(!imageURL) return next(errorHandler(500, "Something went wrong"))
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { profilePicture: imageURL });

    res.status(200).json({ success: true, message: "Image uploaded successfully.", newImage: imageURL });
  } catch (err) {
    next(err);
  }
};

module.exports = uploadProfileImage;
