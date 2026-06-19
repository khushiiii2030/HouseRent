const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/add", protect, addToWishlist);
router.get("/my", protect, getMyWishlist);
router.delete("/:id", protect, removeFromWishlist);

module.exports = router;