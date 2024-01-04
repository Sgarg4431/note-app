const User = require("../models/userModel");
const AppError = require("../services/appError");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtConfig = require("../config/jwtConfig");

// signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if ((!name, !email, !password, !confirm_password)) {
      throw new Error("Body is required");
    }
    // checking if email is valid
    const isValid = validator.validate(email);
    if (!isValid) {
      throw new Error("email is invalid");
    }
    // checking if passowrd matches
    if (password !== confirm_password) {
      throw new Error("password and confirm password did not matched");
    }
    // Look for email coincidence
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(401).json({
        status: "User already exists",
      });
    }

    // Saving a New User
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return res.status(200).json({
      status: "success",
      message: "user saved successfully",
    });
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 400));
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Body is required");
    }
    // getting the user
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      // matching the password
      const passwordMatch = await bcrypt.compare(password, userFound.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign({ email }, jwtConfig.JWT_SECRET, {
        expiresIn: jwtConfig.EXPIRES_IN,
      });
      return res.status(200).json({ msg: "User logged In", token });
    }else{
        throw new Error("User does not exists");
    }
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 401));
  }
};

module.exports = {
  signup: signup,
  login: login,
};
