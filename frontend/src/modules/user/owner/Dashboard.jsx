import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [propRes, bookRes] = await Promise.all([
        api.get("/owner/my-properties", {
          headers: { Authorization: `Bearer ${token}` },
        }),

        api.get("/owner/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setProperties(propRes.data);
      setBookings(bookRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pending = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;

  return (
    <div style={styles.page}>
      <h2>🏠 Owner Dashboard</h2>

      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>🏡 Properties</h3>
          <p>{properties.length}</p>
        </div>

        <div style={styles.card}>
          <h3>📅 Total Bookings</h3>
          <p>{bookings.length}</p>
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