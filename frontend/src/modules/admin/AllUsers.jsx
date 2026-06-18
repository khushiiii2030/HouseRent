import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/user/all"); // ✅ FIXED ROUTE
      setUsers(res.data); // ✅ backend returns array directly
    };

    fetchUsers();
  }, []);

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>👤 All Users</h2>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search users..."
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

        {filtered.map((u) => (
          <div
            key={u._id}
            style={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3>👤 {u.name}</h3>

            <p>📧 {u.email}</p>

            <p>🔐 Role: {u.role}</p>

            <button
              onClick={() => deleteUser(u._id)}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}