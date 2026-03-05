const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "User exists or error occurred" });
  }
});

// Login
router.post("/login", async (req, res) => {

  console.log("Login API hit");
  console.log("Request body:", req.body);

  try {

    const { email, password } = req.body;

    console.log("Finding user...");

    const user = await User.findOne({ email });

    console.log("User result:", user);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    console.log("Comparing password...");

    const match = await bcrypt.compare(password, user.password);

    console.log("Password match:", match);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    console.log("Creating token...");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ token });

  } catch (err) {

    console.log("ERROR:", err);

    return res.status(500).json({ error: err.message });

  }

});
module.exports = router;