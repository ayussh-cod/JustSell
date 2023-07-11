const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/olx", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }

};
  module.exports = connectDb;
