const Wishlist = require("../models/WishlistSchema");

// ADD TO WISHLIST
const addToWishlist = async (req, res) => {
  try {
    const exists = await Wishlist.findOne({
      user: req.user.id,
      property: req.body.propertyId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const item = await Wishlist.create({
      user: req.user.id,
      property: req.body.propertyId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MY WISHLIST
const getMyWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id }).populate("property");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE FROM WISHLIST
const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
};