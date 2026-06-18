const Booking = require("../models/BookingSchema");
const Property = require("../models/PropertySchema");

// USER BOOK PROPERTY
const bookProperty = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      property: req.body.propertyId,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property")
      .populate("user", "name email");

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OWNER: SEE BOOKINGS ON THEIR PROPERTIES
const getOwnerBookings = async (req, res) => {
  try {
    // step 1: find properties owned by this owner
    const properties = await Property.find({ owner: req.user.id });

    const propertyIds = properties.map((p) => p._id);

    // step 2: find bookings for those properties
    const bookings = await Booking.find({
      property: { $in: propertyIds },
    })
      .populate("user", "name email")
      .populate("property", "title location rent");

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookProperty, getMyBookings,getOwnerBookings };