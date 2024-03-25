const mongoose = require("mongoose");

module.exports = connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected Successfully!")
  } catch (error) {
    return new Error(error);
  }
};
