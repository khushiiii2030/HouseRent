import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  console.log("PROFILE PAGE LOADED");
  fetchProfile();
}, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <h3>Loading...</h3>;

  return (
    <div style={styles.card}>
      <h2>👤 My Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
};