const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser")
const connectDB = require("./dbConfig");
const path = require('path')

const userAuth = require("./routes/userRoutes/userAuth.js");
const uploadProfileImage = require("./routes/userRoutes/uploadProfileImage.js")
const deleteUserAccount = require("./routes/userRoutes/deleteUserAccount.js")
// Database connection
connectDB(process.env.MONGO_DB_URI);

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))

app.listen(3000, () => console.log("server running on PORT 3000"));


app.use("/api/user-auth", userAuth);
app.use('/api/upload', uploadProfileImage)
app.use('/api/user', deleteUserAccount)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
