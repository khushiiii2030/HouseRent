import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null); // ⭐ prevent double click

  useEffect(() => {
    fetchProperties();
  }, []);

  // 📌 GET PROPERTIES
  const fetchProperties = async () => {
    try {
      const res = await api.get("/property");
      setProperties(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  // 📌 BOOK PROPERTY
  const handleBook = async (propertyId) => {
    if (loadingId) return; // ⭐ prevent multiple clicks

    try {
      setLoadingId(propertyId);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/booking/book",
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("BOOK SUCCESS:", res.data);
      alert("Booked successfully 🎉");
    } catch (err) {
      console.log("BOOK ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoadingId(null);
    }
  };

  // ❤️ WISHLIST
  const addToWishlist = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/wishlist/add",
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("WISHLIST SUCCESS:", res.data);
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.log("WISHLIST ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Wishlist failed");
    }
  };

  // 📌 SEARCH FILTER
  const filtered = properties.filter((p) => {
    const query = search.toLowerCase();

    return (
      (p?.title || "").toLowerCase().includes(query) ||
      (p?.location || "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <h2>🏡 All Properties</h2>

      <input
        type="text"
        placeholder="Search property..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p._id} style={styles.card}>
              <h3>{p.title}</h3>
              <p>📍 {p.location}</p>
              <p>💰 ₹{p.rent}</p>
              <p>{p.description}</p>

              <div style={styles.actions}>
                <button
                  style={styles.bookBtn}
                  onClick={() => handleBook(p._id)}
                  disabled={loadingId === p._id}
                >
                  {loadingId === p._id ? "Booking..." : "Book Now"}
                </button>

                <button
                  style={styles.wishBtn}
                  onClick={() => addToWishlist(p._id)}
                >
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  search: {
    padding: "8px",
    margin: "10px 0",
    width: "100%",
    maxWidth: "300px",
  },

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

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  bookBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  wishBtn: {
    background: "transparent",
    border: "1px solid red",
    color: "red",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};