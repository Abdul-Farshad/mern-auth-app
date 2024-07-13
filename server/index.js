const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./dbConfig");

// Database connection
connectDB(process.env.MONGO_DB_URI);

const app = express();

app.listen(3000, () => console.log("server running on PORT 3000"));
