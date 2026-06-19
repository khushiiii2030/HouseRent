const Booking = require("../models/BookingSchema");
const Property = require("../models/PropertySchema");

// ================= BOOK PROPERTY =================
const bookProperty = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    // 🔒 SAFE DUPLICATE CHECK (IMPORTANT FIX)
    const alreadyBooked = await Booking.findOne({
      user: req.user.id,
      property: propertyId,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "You already booked this property",
      });
    }

    // ✅ CREATE BOOKING
    const booking = await Booking.create({
      user: req.user.id,
      property: propertyId,
      status: "pending",
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.log("BOOKING ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ================= MY BOOKINGS =================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("property");

    return res.json({
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ================= OWNER BOOKINGS =================
const getOwnerBookings = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });

    const propertyIds = properties.map((p) => p._id);

    const bookings = await Booking.find({
      property: { $in: propertyIds },
    })
      .populate("user", "name email")
      .populate("property", "title location rent");

    return res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("OWNER BOOKINGS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookProperty,
  getMyBookings,
  getOwnerBookings,
};