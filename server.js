const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./server/config/connect");

// Load env
dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
// FIXED CORS FOR PRODUCTION + LOCAL
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5176",
    "https://houserent-2-cxbb.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// ================= DATABASE =================
connectDB();

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("HouseRent Backend Running");
});

// ================= ROUTES =================
const adminRoutes = require("./server/routers/adminRoutes");
const ownerRoutes = require("./server/routers/ownerRoutes");
const userRoutes = require("./server/routers/userRoutes");
const propertyRoutes = require("./server/routers/propertyRoutes");
const bookingRoutes = require("./server/routers/bookingRoutes");
const authRoutes = require("./server/routers/authRoutes");

// ✔ FIXED WISHLIST ROUTE (IMPORTANT)
const wishlistRoutes = require("./server/routers/wishlistRoutes");

// ================= USE ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/auth", authRoutes);

// ✔ FIXED PATH HERE
app.use("/api/wishlist", wishlistRoutes);

// ================= SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});