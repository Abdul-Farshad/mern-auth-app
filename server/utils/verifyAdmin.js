const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return next(errorHandler(401, "Not authenticated"));
  jwt.verify(token, process.env.JWT_SECRET, (error, admin) => {
    if (error) {
      console.log("admin token verification error: ", error.message)
      return next(errorHandler(403, "Token is not valid"));
    }

    req.admin = admin;
    next()
  })
};

module.exports = verifyAdmin;
