import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  // 📌 GET ALL BOOKINGS (ADMIN)
  const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/booking/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("BOOKINGS RESPONSE:", res.data);

    const data = res.data;

    const bookings = Array.isArray(data)
      ? data
      : data.bookings || [];

    setBookings(bookings);

  } catch (err) {
    console.log("FETCH ERROR:", err.response?.data || err.message);
  }
};

  // ✅ APPROVE
  const approveBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(`/booking/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchBookings();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ❌ REJECT
  const rejectBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(`/booking/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchBookings();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const filtered = bookings.filter((b) =>
    (b.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.user?.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.property?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📅 All Bookings</h2>

      <input
        placeholder="🔍 Search bookings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {filtered.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          filtered.map((b) => (
            <div
              key={b._id}
              style={{
                width: "320px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>👤 {b.user?.name}</h3>
              <p>📧 {b.user?.email}</p>
              <p>🏠 Property: {b.property?.title}</p>
              <p>📌 Status: {b.status}</p>

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
                    cursor: "pointer",
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
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}