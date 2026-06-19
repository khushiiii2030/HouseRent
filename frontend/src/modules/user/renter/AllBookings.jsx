import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // 📌 GET BOOKINGS
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/booking/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log("BOOKING FETCH ERROR:", err.response?.data || err.message);
    }
  };

  // 📌 CANCEL BOOKING
  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/booking/cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));

      alert("Booking cancelled ❌");
    } catch (err) {
      console.log("CANCEL ERROR:", err);
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  // 🎨 STATUS COLOR FUNCTION
  const getStatusStyle = (status) => {
    return {
      padding: "3px 8px",
      borderRadius: "5px",
      color: "white",
      fontSize: "12px",
      background:
        status === "approved"
          ? "green"
          : status === "rejected"
          ? "red"
          : "orange",
    };
  };

  return (
    <div>
      <h2>📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b._id} style={styles.card}>
              <h3>{b.property?.title || "Property not available"}</h3>

              <p>📍 {b.property?.location || "-"}</p>
              <p>💰 ₹{b.property?.rent || "-"}</p>

              {/* 📅 BOOKING DATE */}
              <p>
                📅 Booked on:{" "}
                {b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* 🎨 STATUS BADGE */}
              <p>
                Status:{" "}
                <span style={getStatusStyle(b.status || "pending")}>
                  {b.status || "pending"}
                </span>
              </p>

              <button
                onClick={() => cancelBooking(b._id)}
                style={styles.cancelBtn}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  cancelBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};