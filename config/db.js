const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log('db is connected...');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
