const express = require("express");
const router = express.Router();

const {
  addProperty,
  getMyProperties,
  deleteProperty,
  updateProperty,
  getOwnerBookings,
} = require("../controllers/ownerController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Owner route working");
});

// ADD PROPERTY
router.post("/add-property", protect, authorizeRoles("owner"), addProperty);

// MY PROPERTIES
router.get("/my-properties", protect, authorizeRoles("owner"), getMyProperties);

// DELETE PROPERTY
router.delete("/property/:id", protect, authorizeRoles("owner"), deleteProperty);

// UPDATE PROPERTY
router.put("/property/:id", protect, authorizeRoles("owner"), updateProperty);

// OWNER BOOKINGS
router.get("/bookings", protect, authorizeRoles("owner"), getOwnerBookings);

module.exports = router;