const mongoose = require("mongoose");
const colors = require("colors");

const uri = "mongodb://localhost:27017/project"
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`Mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;