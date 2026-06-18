const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  bookProperty,
  getMyBookings,
  getOwnerBookings,
} = require("../controllers/bookingController");
const { authorizeRoles } = require("../middlewares/authMiddleware");

// BOOK PROPERTY
router.post("/book", protect, bookProperty);

// MY BOOKINGS
router.get("/my", protect, getMyBookings);

// OWNER BOOKINGS
router.get(
  "/owner",
  protect,
  authorizeRoles("owner"),
  getOwnerBookings
);

module.exports = router;