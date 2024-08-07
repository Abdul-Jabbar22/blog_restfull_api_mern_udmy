const mongoose = require("mongoose");
const { connectionUrl } = require("../config/keys");
const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("db connecte successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
module.exports = connectMongodb;
