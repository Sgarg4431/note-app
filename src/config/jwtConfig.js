require("dotenv").config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRES_IN:process.env.EXPIRES_IN
  };