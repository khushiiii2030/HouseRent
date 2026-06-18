import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [properties, setProperties] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ USERS
        const u = await api.get("/user/all");

        // ✅ PROPERTIES
        const p = await api.get("/property");

        // ✅ BOOKINGS
        const b = await api.get("/booking");

        setUsers(Array.isArray(u.data) ? u.data.length : 0);
        setProperties(Array.isArray(p.data) ? p.data.length : 0);
        setBookings(Array.isArray(b.data) ? b.data.length : 0);
      } catch (err) {
        console.log("Dashboard Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2>📊 Admin Dashboard</h2>

      <div style={styles.grid}>
        <div style={{ ...styles.card, background: "#e3f2fd" }}>
          <h3>👤 Users</h3>
          <p>{users}</p>
        </div>

        <div style={{ ...styles.card, background: "#e8f5e9" }}>
          <h3>🏠 Properties</h3>
          <p>{properties}</p>
        </div>

        <div style={{ ...styles.card, background: "#fff3e0" }}>
          <h3>📅 Bookings</h3>
          <p>{bookings}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  grid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "200px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};