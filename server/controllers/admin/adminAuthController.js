const Admin = require("../../models/adminModel");
const errorHandler = require("../../utils/error");
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const adminSigin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });

    if (!validAdmin) return next(errorHandler(400, "Admin not found"));

    const validPassword = bcryptjs.compareSync(password, validAdmin.password);

    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
    const { password: hashedPassword, ...rest } = validAdmin._doc;

    // create jwt token
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET, {
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
      .json({ success: true, message: "Sign in successful",  adminData: rest });
  } catch (err) {
    next(err);
  }
};

module.exports = { adminSigin };
