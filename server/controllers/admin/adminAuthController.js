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
      expiresIn: "1d",
    });

    res
      .cookie("admin_token", token, {
        httpOnly: true,
        maxAge: 24* 60 * 60 * 1000, // 1d
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "Sign in successful",  adminData: rest });
  } catch (err) {
    next(err);
  }
};


const adminSignOut  = (req, res) => {
  res.clearCookie("admin_token").status(200).json({message: "Sign Out successful"});
} 

module.exports = { adminSigin , adminSignOut};
