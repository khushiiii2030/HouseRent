import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/wishlist/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data);
    } catch (err) {
      console.log("WISHLIST ERROR:", err.response?.data || err.message);
    }
  };

  // ❌ REMOVE FROM WISHLIST
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>❤️ My Wishlist</h2>

      <div style={styles.grid}>
        {wishlist.map((w) => (
          <div key={w._id} style={styles.card}>

            <h3>{w.property?.title}</h3>
            <p>📍 {w.property?.location}</p>
            <p>💰 ₹{w.property?.rent}</p>
            <p>{w.property?.description}</p>

            <button
              style={styles.removeBtn}
              onClick={() => removeItem(w._id)}
            >
              Remove ❌
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

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

  removeBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};