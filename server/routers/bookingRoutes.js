const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const {
  bookProperty,
  getMyBookings,
  getOwnerBookings,
} = require("../controllers/bookingController");

// ================= BOOK PROPERTY =================
router.post("/book", protect, bookProperty);

// ================= MY BOOKINGS =================
router.get("/my", protect, getMyBookings);

// ================= OWNER BOOKINGS =================
router.get(
  "/owner",
  protect,
  authorizeRoles("owner"),
  getOwnerBookings
);

// ================= ADMIN: GET ALL BOOKINGS (NEW FIX) =================
router.get("/", async (req, res) => {
  try {
    const Booking = require("../models/BookingSchema");

    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("property", "title location rent");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const Booking = require("../models/BookingSchema");

// APPROVE BOOKING (ADMIN)
router.put("/approve/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "approved";
    await booking.save();

    res.json({ message: "Booking approved", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REJECT BOOKING (ADMIN)
router.put("/reject/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "rejected";
    await booking.save();

    res.json({ message: "Booking rejected", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;