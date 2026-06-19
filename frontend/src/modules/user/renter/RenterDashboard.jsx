import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function RenterDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ FIXED ROUTE
      const res = await api.get("/booking/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("DASHBOARD BOOKINGS:", res.data);

      // backend returns { count, bookings }
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log("DASHBOARD ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.page}>
      <h2>🏠 Renter Dashboard</h2>

      <div style={styles.grid}>

        {/* TOTAL */}
        <div style={styles.card}>
          <h3>📅 Total Bookings</h3>
          <h1>{bookings.length}</h1>
        </div>

        {/* ACTIVE */}
        <div style={styles.card}>
          <h3>🏡 Active Bookings</h3>
          <h1>
            {bookings.filter(b => b.status === "approved").length}
          </h1>
        </div>

        {/* PENDING */}
        <div style={styles.card}>
          <h3>⏳ Pending Bookings</h3>
          <h1>
            {bookings.filter(b => b.status === "pending").length}
          </h1>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};