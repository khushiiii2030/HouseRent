import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          background: "#1a1a1a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>🏢 Admin Panel</h2>

        <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/users" style={linkStyle}>Users</Link>
        <Link to="/admin/properties" style={linkStyle}>Properties</Link>
        <Link to="/admin/bookings" style={linkStyle}>Bookings</Link>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px", background: "#f4f4f4" }}>
        <Outlet />
      </div>

    </div>
  );
};

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  margin: "12px 0",
};

export default AdminLayout;