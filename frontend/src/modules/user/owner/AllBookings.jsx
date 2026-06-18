import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/booking/owner", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(res.data.bookings || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, []);

  const filtered = bookings.filter(
    (b) =>
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.property?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📅 Owner Bookings</h2>

      <input
        placeholder="🔍 Search bookings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

        {filtered.map((b) => (
          <div
            key={b._id}
            style={{
              width: "320px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3>👤 {b.user?.name}</h3>
            <p>📧 {b.user?.email}</p>

            <p>🏠 {b.property?.title || "Property"}</p>

            <p>📌 Status: {b.status}</p>
          </div>
        ))}

      </div>
    </div>
  );
}