const mongoose = require("mongoose")
require("dotenv").config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = (URI) => {
  mongoose.connect(URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database connection error:", err));
};

module.exports =  connectDB;
