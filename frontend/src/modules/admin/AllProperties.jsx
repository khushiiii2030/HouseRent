import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/property");

      console.log("PROPERTY DATA:", res.data);

      setProperties(res.data || []);
    };

    fetchData();
  }, []);

  const filtered = properties.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>🏠 All Properties</h2>

      <input
        placeholder="🔍 Search properties..."
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
        {filtered.map((item) => (
          <div
            key={item._id}
            style={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              background: "#fff"
            }}
          >
            <h3>🏠 {item.title}</h3>
            <p>📍 {item.location}</p>
            <p style={{ fontSize: "14px", color: "#555" }}>
              📝 {item.description}
            </p>
            <h4 style={{ color: "green" }}>
              ₹ {item.rent}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}