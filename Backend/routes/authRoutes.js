const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware");

router.get("/profile", authenticateUser, (req, res) => {
  res.json({ message: "User authenticated successfully", user: req.user });
});

module.exports = router;
