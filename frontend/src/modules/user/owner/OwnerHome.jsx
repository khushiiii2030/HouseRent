import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function OwnerHome() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏠 Owner Panel</h2>

        <NavLink to="/owner" style={styles.link}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/owner/add-property" style={styles.link}>
          ➕ Add Property
        </NavLink>

        <NavLink to="/owner/properties" style={styles.link}>
          🏡 My Properties
        </NavLink>

        <NavLink to="/owner/bookings" style={styles.link}>
          📅 Bookings
        </NavLink>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <h3>Welcome Owner 👋</h3>

          {/* PROFILE DROPDOWN */}
          <div style={styles.profileBox}>
            <div
              style={styles.profile}
              onClick={() => setOpen(!open)}
            >
              👤 Profile ⬇
            </div>

            {open && (
              <div style={styles.dropdown}>
                <button style={styles.dropItem}>
                  My Profile
                </button>

                <button
                  style={styles.logout}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "220px",
    background: "#363030",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "5px",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  topbar: {
    height: "60px",
    background: "#f4f4f4",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ddd",
  },

  profileBox: {
    position: "relative",
  },

  profile: {
    background: "#000",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "120px",
    display: "flex",
    flexDirection: "column",
  },

  dropItem: {
    padding: "10px",
    border: "none",
    background: "white",
    cursor: "pointer",
  },

  logout: {
    padding: "10px",
    border: "none",
    background: "red",
    color: "white",
    cursor: "pointer",
  },

  content: {
    padding: "20px",
    overflowY: "auto",
  },
};