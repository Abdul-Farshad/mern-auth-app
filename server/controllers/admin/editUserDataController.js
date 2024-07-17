const User = require("../../models/userModel");
const errorHandler = require("../../utils/error");
const editUser = async (req, res, next) => {
  console.log("new user data: ", req.body);
  try {
    const { username, email } = req.body;
    const userId = req.params.id;
    const existingUser = await User.findById(userId)
    if(!existingUser) return next(errorHandler(404, "User not found"));

    const updateData = {}

    if(email && email !== existingUser.email) {
        const existingEmail = await User.findOne({email});
        if(existingEmail) return next(errorHandler(400, "Email already exists"))
        updateData.email = email;
    }
    if(username && username !== existingUser.username) {
        const existingUsername = await User.findOne({username});
        if(existingUsername) return next(errorHandler(400, "Username already taken"));
        updateData.username = username;
    }
    console.log("updateData: ",updateData)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {$set: updateData},
      { new: true, select: "-password" }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully!",
        updatedUser,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
