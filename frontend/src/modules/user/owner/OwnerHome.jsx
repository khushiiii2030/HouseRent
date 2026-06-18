import { Link, Outlet } from "react-router-dom";

export default function OwnerHome() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#111",
          color: "white",
          padding: "20px"
        }}
      >
        <h2>🏠 Owner Panel</h2>

        <nav style={{ marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>

            <li style={{ margin: "10px 0" }}>
              <Link to="" style={{ color: "white", textDecoration: "none" }}>
                🏠 Dashboard
              </Link>
            </li>

            <li style={{ margin: "10px 0" }}>
              <Link to="properties" style={{ color: "white", textDecoration: "none" }}>
                🏡 My Properties
              </Link>
            </li>

            <li style={{ margin: "10px 0" }}>
              <Link to="add-property" style={{ color: "white", textDecoration: "none" }}>
                ➕ Add Property
              </Link>
            </li>

            <li style={{ margin: "10px 0" }}>
              <Link to="bookings" style={{ color: "white", textDecoration: "none" }}>
                📅 Bookings
              </Link>
            </li>

          </ul>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px", background: "#f4f6f8" }}>
        <Outlet />
      </div>

    </div>
  );
}