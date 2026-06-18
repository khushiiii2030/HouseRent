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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/owner/add-property",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Property added successfully!");
      console.log(res.data);

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
    <div>
      <h2>➕ Add Property</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

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
          placeholder="Rent"
          type="number"
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
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    gap: "10px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};