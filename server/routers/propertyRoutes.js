const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  addProperty,
  getProperties,
  getMyProperties
} = require("../controllers/propertyController");

router.post("/add", protect, authorizeRoles("owner"), addProperty);

router.get("/", getProperties);

router.get("/my", protect, authorizeRoles("owner"), getMyProperties);

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const results = await Property.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } }
      ]
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;