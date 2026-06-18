const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY PROPERTIES
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) return res.status(404).json({ message: "Not found" });

    if (property.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await Property.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROPERTY
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET OWNER BOOKINGS (SAFE FIXED)
const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("property");

    console.log("SAMPLE BOOKING:", bookings[0]);

    return res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  addProperty,
  getMyProperties,
  deleteProperty,
  updateProperty,
  getOwnerBookings,
};