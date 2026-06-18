import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [properties, setProperties] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await api.get("/user");
        const p = await api.get("/property");
        const b = await api.get("/booking");

        setUsers(u.data.length || u.data.count || 0);
        setProperties(p.data.count || p.data.length || 0);
        setBookings(b.data.count || b.data.length || 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

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
          <h3>📅 Bookings</h3>
          <p>{bookings}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  grid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  }
};