const express = require("express");
const router = express.Router();

const Booking = require("../models/BookingSchema");
const Property = require("../models/PropertySchema");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


// ================= BOOK PROPERTY =================
router.post("/book", protect, async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID required" });
    }

    // ❌ prevent duplicate booking
    const alreadyBooked = await Booking.findOne({
      user: req.user.id,
      property: propertyId,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "You already booked this property",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      property: propertyId,
      status: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.log("BOOK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= MY BOOKINGS =================
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property")
      .populate("user", "name email");

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    console.log("MY BOOKINGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= OWNER BOOKINGS =================
router.get("/owner", protect, authorizeRoles("owner"), async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });

    const propertyIds = properties.map((p) => p._id);

    const bookings = await Booking.find({
      property: { $in: propertyIds },
    })
      .populate("user", "name email")
      .populate("property", "title location rent");

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    console.log("OWNER BOOKINGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= ADMIN: ALL BOOKINGS =================
router.get("/all", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("property", "title location rent");

    res.json(bookings);
  } catch (err) {
    console.log("ALL BOOKINGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= APPROVE =================
router.put("/approve/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    booking.status = "approved";
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.log("APPROVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= REJECT =================
router.put("/reject/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    booking.status = "rejected";
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.log("REJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= CANCEL BOOKING =================
router.delete("/cancel/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // only owner can cancel
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.log("CANCEL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;