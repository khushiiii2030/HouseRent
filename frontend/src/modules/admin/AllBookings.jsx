import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking");
        setBookings(res.data);
      } catch (err) {
        console.log("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // ✅ APPROVE BOOKING
  const approveBooking = async (id) => {
    try {
      await api.put(`/booking/approve/${id}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "approved" } : b
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ REJECT BOOKING
  const rejectBooking = async (id) => {
    try {
      await api.put(`/booking/reject/${id}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "rejected" } : b
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = bookings.filter((b) =>
    b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    b.property?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📅 All Bookings</h2>

      {/* SEARCH BAR */}
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

      {/* BOOKING CARDS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

        {filtered.map((b) => (
          <div
            key={b._id}
            style={{
              width: "320px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3>👤 {b.user?.name}</h3>

            <p>📧 {b.user?.email}</p>

            <p>🏠 Property: {b.property?.title || "Not Assigned"}</p>

            <p>📌 Status: {b.status}</p>

            {/* ✅ ADMIN BUTTONS */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => approveBooking(b._id)}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  marginRight: "5px",
                  cursor: "pointer"
                }}
              >
                Approve
              </button>

              <button
                onClick={() => rejectBooking(b._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}