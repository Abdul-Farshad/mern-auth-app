const User = require("../../models/userModel.js");
const errorHandler = require("../../utils/error.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User sign up process
const userSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
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
      .json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    next(err);
  }
};

// User sign in process
const userSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    // remove the password from user data to send to client side
    const { password: hashedPassword, ...rest } = validUser._doc;
    // create jwt token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "Signin successful",  userData: rest });
  } catch (err) {
    next(err);
  }
};

const userSignout = (req, res) => {
  res.clearCookie('access_token').status(200).json({message: "Sign out successful!"})
}

module.exports = { userSignup, userSignin, userSignout };
