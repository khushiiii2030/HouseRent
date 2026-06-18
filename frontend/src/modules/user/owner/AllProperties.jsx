import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/owner/my-properties");
        setProperties(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, []);

  const filtered = properties.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>🏠 My Properties</h2>

      <input
        placeholder="🔍 Search property..."
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {filtered.map((p) => (
          <div
            key={p._id}
            style={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{p.title}</h3>

            <p>📍 {p.location}</p>

            <p>{p.description}</p>

            <h4 style={{ color: "green" }}>
              ₹ {p.rent}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}