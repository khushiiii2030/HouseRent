const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// GET ALL USERS
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

// GET ALL PROPERTIES
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

// GET ALL BOOKINGS
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

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// EXPORTS
module.exports = {
  getAllUsers,
  getAllProperties,
  getAllBookings,
  deleteUser
};