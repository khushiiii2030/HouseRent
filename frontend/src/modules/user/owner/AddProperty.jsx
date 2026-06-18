import { useState } from "react";
import api from "../../../api/axios";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    rent: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/owner/add-property", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Property added successfully!");

      setForm({
        title: "",
        description: "",
        location: "",
        rent: ""
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error adding property");
    }
  };

  return (
    <div style={styles.page}>

      <form onSubmit={handleSubmit} style={styles.form}>

        <h2 style={{ textAlign: "center" }}>➕ Add Property</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="rent"
          type="number"
          placeholder="Rent"
          value={form.rent}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Add Property
        </button>

      </form>

    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    background: "#f5f6fa"
  },

  form: {
    width: "450px",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "12px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%"
  },

  button: {
    padding: "12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  }
};