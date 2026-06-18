const Property = require("../models/PropertySchema");

// ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProperty };