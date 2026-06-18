import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🏠 Admin Panel</h2>

        <Link to="/admin" style={styles.link}>Dashboard</Link>
        <Link to="/admin/users" style={styles.link}>Users</Link>
        <Link to="/admin/properties" style={styles.link}>Properties</Link>
        <Link to="/admin/bookings" style={styles.link}>Bookings</Link>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <div>
            <h3>👤 {user?.name}</h3>
            <small style={{ color: "gray" }}>
              Role: {user?.role}
            </small>
          </div>

          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        </div>

        {/* PAGE CONTENT */}
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
    fontFamily: "Arial"
  },

  sidebar: {
    width: "220px",
    background: "#110952",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  logo: {
    color: "white",
    marginBottom: "20px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    display: "block",
    transition: "0.3s"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "1px solid #ddd",
    background: "#ffffff"
  },

  content: {
    padding: "20px",
    background: "#fbfcfd",
    height: "100%"
  },

  logout: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};