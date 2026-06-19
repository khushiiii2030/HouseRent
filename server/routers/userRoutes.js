const express = require("express");
const router = express.Router();

const User = require("../models/UserSchema");

const { registerUser, loginUser } = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// ================= REGISTER =================
router.post("/register", registerUser);

// ================= LOGIN =================
router.post("/login", loginUser);

// ================= GET LOGGED IN USER =================
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= GET ALL USERS (ADMIN PANEL) =================
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELETE USER (ADMIN) =================
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= ROLE TEST ROUTES =================
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/owner", protect, authorizeRoles("owner"), (req, res) => {
  res.json({ message: "Welcome Owner" });
});

router.get("/userhome", protect, authorizeRoles("user"), (req, res) => {
  res.json({ message: "Welcome User" });
});

module.exports = router;