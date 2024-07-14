const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./dbConfig");

const userRoute = require("./routes/userRoutes/userRoute.js");
const userAuth = require("./routes/userRoutes/userAuth.js");
// Database connection
connectDB(process.env.MONGO_DB_URI);

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("server running on PORT 3000"));

app.use("/api/user", userRoute);
app.use("/api/user-auth", userAuth);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
