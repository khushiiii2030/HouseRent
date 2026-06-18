const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema"); // make sure path is correct

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  console.log("LOGIN HIT");

  try {
    const { email, password } = req.body;

    console.log("REQUEST BODY:", req.body);

    const user = await User.findOne({ email });

    console.log("USER FROM DB:", user);

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      console.log("❌ WRONG PASSWORD");
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ LOGIN SUCCESS");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.log("❌ SERVER ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;