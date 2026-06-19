import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // MY PROPERTIES
      const propRes = await api.get("/property/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(propRes.data.properties || []);

      // OWNER BOOKINGS
      const bookingRes = await api.get("/booking/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookingRes.data.bookings || []);
    } catch (err) {
      console.log("OWNER DASHBOARD ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>🏡 Owner Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>📌 My Properties: {properties.length}</h3>
        <h3>📅 Bookings Received: {bookings.length}</h3>
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {properties.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <h4>🏠 {p.title}</h4>
            <p>📍 {p.location}</p>
            <p>💰 {p.rent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}