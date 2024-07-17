const User = require('../../models/userModel');
const bcryptjs = require('bcryptjs')

module.exports = async function addNewUser (req, res, next) {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(400).json({
            message:
              "Username or email already exists. Please try a different one.",
          });
        }
    
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        // save new user data
        await user.save();
        res
          .status(201)
          .json({ success: true, message: "User account successfully created!" });
      } catch (err) {
        next(err);
      }
}