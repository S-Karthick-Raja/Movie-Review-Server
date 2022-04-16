const mongoose = require("mongoose");

const dbConnect = () => {
  // Connect DataBase
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("DB is connected"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
