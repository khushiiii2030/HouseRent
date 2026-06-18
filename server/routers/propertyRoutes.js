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

module.exports = router;