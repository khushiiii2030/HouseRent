const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env ONCE here OR in server.js (not both needed, but safe)
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;