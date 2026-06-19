import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [properties, setProperties] = useState(0);

  const [totalBookings, setTotalBookings] = useState(0);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);

  useEffect(() => {
    fetchDashboard();

    window.addEventListener("focus", fetchDashboard);

    return () => {
      window.removeEventListener("focus", fetchDashboard);
    };
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("NO TOKEN FOUND");
        return;
      }

      // 📅 BOOKINGS
      const bookingRes = await api.get("/booking/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("BOOKINGS RESPONSE:", bookingRes.data);
    console.log("BOOKINGS ARRAY:", bookingRes.data.bookings);

      const bookings = bookingRes.data || [];

      console.log("BOOKINGS FROM BACKEND:", bookings);

      setTotalBookings(bookings.length);
      setPending(bookings.filter(b => b.status === "pending").length);
      setApproved(bookings.filter(b => b.status === "approved").length);

      // 👤 USERS
      const userRes = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(userRes.data.users?.length || 0);

      // 🏠 PROPERTIES
      const propertyRes = await api.get("/admin/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(propertyRes.data.properties?.length || 0);

    } catch (err) {
      console.log("DASHBOARD ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📊 Admin Dashboard</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>👤 Users</h3>
          <p>{users}</p>
        </div>

        <div style={styles.card}>
          <h3>🏠 Properties</h3>
          <p>{properties}</p>
        </div>

        <div style={styles.card}>
          <h3>📅 Total Bookings</h3>
          <p>{totalBookings}</p>
        </div>

        <div style={styles.card}>
          <h3>⏳ Pending</h3>
          <p>{pending}</p>
        </div>

        <div style={styles.card}>
          <h3>✅ Approved</h3>
          <p>{approved}</p>
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
    background: "#f9f9f9",
  },
};