import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  // GET ALL PROPERTIES
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/owner/my-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PROPERTY
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/owner/property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties((prev) => prev.filter((p) => p._id !== id));

      alert("Deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // OPEN EDIT BOX
  const handleEdit = (property) => {
    setEditData(property);
  };

  // UPDATE PROPERTY
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/owner/property/${editData._id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties((prev) =>
        prev.map((p) => (p._id === editData._id ? res.data : p))
      );

      setEditData(null);

      alert("Updated successfully");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // FILTERED PROPERTIES (SEARCH)
  const filteredProperties = properties.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2>🏡 My Properties</h2>

      {/* SEARCH BOX */}
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

      {/* PROPERTY LIST */}
      <div style={styles.grid}>
        {filteredProperties.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3>{p.title}</h3>
            <p>📍 {p.location}</p>
            <p>💰 ₹{p.rent}</p>
            <p>{p.description}</p>

            <button style={styles.editBtn} onClick={() => handleEdit(p)}>
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <h3>Edit Property</h3>

            <input
              style={styles.input}
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              placeholder="Title"
            />

            <input
              style={styles.input}
              value={editData.location}
              onChange={(e) =>
                setEditData({ ...editData, location: e.target.value })
              }
              placeholder="Location"
            />

            <input
              style={styles.input}
              type="number"
              value={editData.rent}
              onChange={(e) =>
                setEditData({ ...editData, rent: e.target.value })
              }
              placeholder="Rent"
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button style={styles.saveBtn} onClick={handleUpdate}>
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  editBtn: {
    marginRight: "10px",
    padding: "6px 10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  saveBtn: {
    background: "black",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "gray",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};