import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    console.log("BOOKINGS DATA:", bookings);
    console.log("FIRST BOOKING:", bookings[0]);
  }, [bookings]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/owner/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    b.property?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2>📅 All Bookings</h2>

      <input
        type="text"
        placeholder="Search property..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          margin: "10px 0",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <div style={styles.grid}>
        {filteredBookings.map((b) => (
          <div key={b._id} style={styles.card}>

            <h3>{b.property?.title || "No Title"}</h3>

            <p>👤 User: {b.user?.name || "N/A"}</p>
            <p>📧 Email: {b.user?.email || "N/A"}</p>

            <p>
              📍 Location: {b.property?.location || b.property?.address || "N/A"}
            </p>

            <p>
              💰 Rent: ₹
              {b.property?.rent ||
                b.property?.price ||
                b.property?.monthlyRent ||
                "N/A"}
            </p>

            <p>Status: {b.status || "N/A"}</p>

          </div>
        ))}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
};