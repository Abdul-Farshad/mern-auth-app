const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Admin = require('../models/adminModel');
const connectDB  = require('../dbConfig');

const seedAdmin = async () => {
  await connectDB(process.env.MONGO_DB_URI);

  const email = 'admin@gmail.com';
  const password = bcryptjs.hashSync('admin123', 10);

  const admin = new Admin({ email, password });
  await admin.save();

  console.log('Admin added successfully');
  mongoose.connection.close();
};

seedAdmin();
