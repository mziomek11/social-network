const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Importing model
const User = require("../../models/User");

// @POST    api/users
// @desc    Register New User
// @access  Public
router.post("", async (req, res) => {
  const { username, email, password, gender, birthDate } = req.body;

  const errors = validateRegisterRequest(req.body);
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json(errors);
  }

  const { day, month, year } = birthDate;
  const birthDateAsDate = new Date(year, month - 1, day, 5, 5, 5, 5);

  try {
    const userWithUsername = await User.findOne({ username });
    if (userWithUsername) {
      errors.username = "This username is already taken";
      return res.status(400).json(errors);
    }

    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      errors.email = "User with this email already exists";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      username,
      email,
      password,
      gender,
      birthDate: birthDateAsDate
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();
    const token = await jwt.sign(
      { id: savedUser.id },
      config.get("jwtSecret"),
      {
        expiresIn: 3600
      }
    );

    res.json({
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        birthDate: savedUser.birthDate,
        gender: savedUser.gender,
        joinDate: savedUser.joinDate
      },
      token
    });
  } catch (err) {
    console.log(err);
  }
});

const validateRegisterRequest = body => {
  const { username, email, password, gender, birthDate } = body;
  const errors = {};
  if (!username) errors.username = "Username field is required";
  if (!email) errors.email = "Email field is required";
  if (!password) errors.password = "Password field is required";
  if (!isDateProper(birthDate)) {
    errors.birthDate = "Enter correct date";
  }
  if (gender !== "Male" && gender !== "Female") {
    errors.gender = "Gender field is required";
  }
  return errors;
};

const isDateProper = date => {
  const { year, month, day } = date;
  if (year > new Date().getFullYear() - 1 || year < 1900) return false;
  if (month > 12 || month < 1) return false;
  if (day > new Date(year, month, 0).getDate() || day < 1) return false;

  return true;
};

module.exports = router;
