import { Routes, Route } from "react-router-dom";

// ADMIN
import AdminHome from "./modules/admin/AdminHome";
import AllUsers from "./modules/admin/AllUsers";
import AllProperties from "./modules/admin/AllProperties";
import AllBookings from "./modules/admin/AllBookings";
import AdminDashboard from "./modules/admin/AdminDashboard";

// OWNER
import OwnerHome from "./modules/owner/OwnerHome";
import AddProperty from "./modules/owner/AddProperty.jsx";
import OwnerProperties from "./modules/owner/AllProperties";
import OwnerBookings from "./modules/owner/OwnerBookings";

// AUTH
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";

// PROTECTED
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login role="user" />} />
      <Route path="/login/admin" element={<Login role="admin" />} />
      <Route path="/login/owner" element={<Login role="owner" />} />
      <Route path="/login/renter" element={<Login role="user" />} />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminHome />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="properties" element={<AllProperties />} />
        <Route path="bookings" element={<AllBookings />} />
      </Route>

      {/* OWNER ROUTES */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerHome />
          </ProtectedRoute>
        }
      >
        <Route index element={<h2>Owner Dashboard</h2>} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="properties" element={<OwnerProperties />} />
        <Route path="bookings" element={<OwnerBookings />} />
      </Route>

    </Routes>
  );
}