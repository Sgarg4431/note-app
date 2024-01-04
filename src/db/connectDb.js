const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig");

// connecting to mongo Db
const connectDb = async () => {
  mongoose
    .connect(dbConfig.URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("Not connected to DB" + e);
    });
};

module.exports = connectDb;
