import { Outlet, Link, useNavigate } from "react-router-dom";

export default function RenterHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏠 Renter Panel</h2>

        <Link to="/renter" style={styles.link}>📊 Dashboard</Link>
        <Link to="/renter/properties" style={styles.link}>🏡 Properties</Link>
        <Link to="/renter/bookings" style={styles.link}>📅 My Bookings</Link>
      </div>

      {/* MAIN AREA */}
      <div style={styles.mainArea}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <div style={styles.left}>Welcome 👋</div>

          <div style={styles.right}>
            <Link to="/renter/wishlist" style={styles.topLink}>❤️ Wishlist</Link>
            <Link to="/renter/profile" style={styles.topLink}>👤 Profile</Link>

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={styles.page}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "220px",
    background: "#368fc6",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px",
    background: "#222",
    color: "white",
  },

  left: {
    fontSize: "22px",
  },

  right: {
    display: "flex",
    gap: "22px",
    alignItems: "center",
  },

  // 🔥 SIDEBAR LINKS
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "6px",
    borderRadius: "6px",
  },

  // ⭐ TOPBAR LINKS (OPTION 2 FIX)
  topLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    padding: "5px 8px",
    borderRadius: "6px",
    transition: "0.2s",
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  page: {
    padding: "20px",
  },
};