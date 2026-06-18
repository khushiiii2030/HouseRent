//TEST SAVE
const express = require("express");
const router = express.Router();

const {
  addProperty,
  getMyProperties,
} = require("../controllers/ownerController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// TEST
router.get("/", (req, res) => {
  res.send("Owner route working");
});

// ADD PROPERTY

router.post(
  "/add-property",
  protect,
  authorizeRoles("owner"),
  addProperty
);

// MY PROPERTIES
router.get(
  "/my-properties",
  protect,
  authorizeRoles("owner"),
  getMyProperties
);
console.log("OWNER ROUTES LOADED");
console.log("getMyProperties =", typeof getMyProperties);

module.exports = router;