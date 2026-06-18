const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./server/config/connect");

// Load env
dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5176"],
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

// ⚠️ Only keep authRoutes if you REALLY have it
const authRoutes = require("./server/routers/authRoutes");

// ================= USE ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);

// auth routes (only if file exists)
app.use("/api/auth", authRoutes);

// ================= SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});