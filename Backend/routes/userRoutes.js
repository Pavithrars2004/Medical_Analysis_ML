const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully ✅", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
