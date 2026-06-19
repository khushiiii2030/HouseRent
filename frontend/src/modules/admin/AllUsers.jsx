import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      console.log("FETCH USERS ERROR:", err);
    }
  };

  const deleteUser = async (id) => {
    console.log("clicked delete", id);
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));

      alert("User deleted");
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>👤 All Users</h2>

      <input
        placeholder="🔍 Search users..."
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
        {filtered.map((u) => (
          <div
            key={u._id}
            style={{
              width: "300px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
                cursor: "pointer",
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