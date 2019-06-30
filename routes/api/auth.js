const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../../middleware/auth");

// Impoering model
const User = require("../../models/User");

// @POST    api/auth
// @desc    Auth User
// @access  Public
router.post("", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = await jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: 3600
    });
    const returnData = {
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        birthDate: user.birthDate,
        gender: user.gender,
        joinDate: user.joinDate
      },
      token
    };

    res.json(returnData);
  } catch (err) {
    console.log(err);
  }
});

// @GET     api/auth/user
// @desc    Get User Data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id).select("-password")
  .then(user => res.json(user));
})

module.exports = router;
