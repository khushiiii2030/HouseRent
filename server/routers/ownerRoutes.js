const express = require("express");
const router = express.Router();

const { addProperty } = require("../controllers/ownerController");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Owner route working");
});

// REAL ROUTE
router.post("/add-property", addProperty);

module.exports = router;