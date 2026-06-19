const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const {
  getAllUsers,
  getAllProperties,
  getAllBookings,
  deleteUser
} = require("../controllers/adminController");

// ================= ADMIN USERS =================
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// ================= ADMIN PROPERTIES =================
router.get(
  "/properties",
  protect,
  authorizeRoles("admin"),
  getAllProperties
);

// ================= ADMIN BOOKINGS =================
router.get(
  "/bookings",
  protect,
  authorizeRoles("admin"),
  getAllBookings
);

// ================= DELETE USER =================
router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;