const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../controllers/adminController");
const { getAllProperties } = require("../controllers/adminController");
const {  getAllBookings } = require("../controllers/adminController");

// ADMIN ONLY
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

router.get("/properties", getAllProperties);

router.get(
  "/bookings",
  protect,
  authorizeRoles("admin"),
  getAllBookings
);

module.exports = router;