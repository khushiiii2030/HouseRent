const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// GET ALL USERS (ADMIN ONLY)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROPERTIES (ADMIN)
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email role");

    res.json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKINGS (ADMIN)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("property", "title location rent");

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllProperties,
  getAllBookings,
};