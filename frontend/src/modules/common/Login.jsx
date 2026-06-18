import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const roleTitle =
    role === "admin"
      ? "Admin Access Login"
      : role === "owner"
      ? "Owner Access Login"
      : "Renter Access Login";

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ FIX 1: safety check (more strict)
      if (!res.data) {
        alert("No response from server");
        return;
      }

      const token = res.data.token;
      const user = res.data.user;

      // ❌ FIX 2: prevent null saving
      if (!token || !user) {
        alert("Login failed: invalid server response");
        return;
      }

      // ✅ STORE
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Saved user:", localStorage.getItem("user"));

      // 🚀 REDIRECT BASED ON ROLE
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/owner");
      else navigate("/renter");

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <h2>🏠 House Rent System</h2>

        <h3 style={{ color: "gray" }}>
          {roleTitle}
        </h3>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: "380px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};