const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// ✅ IMPORTANT: load .env from ROOT folder
dotenv.config({ path: path.join(__dirname, "../.env") });

const connectDB = require("./config/connect");
const Property = require("./models/PropertySchema");

// connect DB
connectDB();

const seedProperties = async () => {
  try {
    await Property.deleteMany();

    await Property.insertMany([
      {
        title: "2BHK Flat",
        location: "Hyderabad",
        rent: 15000,
      },
      {
        title: "1BHK Studio",
        location: "Delhi",
        rent: 12000,
      },
      {
        title: "3BHK Apartment",
        location: "Bangalore",
        rent: 28000,
      },
      {
        title: "Modern Flat",
        location: "Mumbai",
        rent: 35000,
      },
      {
        title: "Budget House",
        location: "Chennai",
        rent: 10000,
      },
      {
        title: "Luxury Villa",
        location: "Pune",
        rent: 50000,
      },
      {
        title: "Compact Home",
        location: "Kochi",
        rent: 9000,
      },
    ]);

    console.log("Database Seeded Successfully 🚀");
    process.exit();
  } catch (error) {
    console.log("Seed Error:", error.message);
    process.exit(1);
  }
};

seedProperties();