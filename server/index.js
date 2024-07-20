const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser")
const connectDB = require("./dbConfig");
const path = require('path')
const cors = require('cors');

//user routes
const userAuth = require("./routes/userRoutes/userAuth.js");
const uploadProfileImage = require("./routes/userRoutes/uploadProfileImage.js")
const deleteUserAccount = require("./routes/userRoutes/deleteUserAccount.js")
//admin routes
const adminAuth = require("./routes/adminRoutes/adminAuth.js")
const adminRoutes = require("./routes/adminRoutes/adminRoute.js")

// Database connection
connectDB(process.env.MONGO_DB_URI);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'client', 'dist', 'index.html'));
});

app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));


app.use("/api/user-auth", userAuth);
app.use('/api/user/upload', uploadProfileImage)
app.use('/api/user', deleteUserAccount)
app.use('/api/admin-auth', adminAuth)
app.use('/api/admin', adminRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
