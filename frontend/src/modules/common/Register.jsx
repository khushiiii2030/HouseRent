import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "user",
      });

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}