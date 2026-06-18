const Property = require("../models/PropertySchema");

// ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    const { title, description, location, rent } = req.body;

    const property = await Property.create({
      title,
      description,
      location,
      rent,
      owner: req.user?.id, // safe fallback
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    // ✅ IMPORTANT FIX: send array directly (NOT object)
    res.json(properties);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY PROPERTIES
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user?.id });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProperty,
  getProperties,
  getMyProperties
};