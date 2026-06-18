import { Routes, Route } from "react-router-dom";

// ADMIN
import AdminHome from "./modules/admin/AdminHome";
import AllUsers from "./modules/admin/AllUsers";
import AllProperties from "./modules/admin/AllProperties";
import AllBookings from "./modules/admin/AllBookings";
import AdminDashboard from "./modules/admin/AdminDashboard";

// OWNER
import OwnerHome from "./modules/user/owner/OwnerHome";
import AddProperty from "./modules/user/owner/AddProperty";
import OwnerProperties from "./modules/user/owner/AllProperties";
import OwnerBookings from "./modules/user/owner/AllBookings";
import OwnerDashboard from "./modules/user/owner/Dashboard";

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
        {/* ✅ NEW DASHBOARD ADDED */}
        <Route index element={<OwnerDashboard />} />

        <Route path="add-property" element={<AddProperty />} />
        <Route path="properties" element={<OwnerProperties />} />
        <Route path="bookings" element={<OwnerBookings />} />
      </Route>

    </Routes>
  );
}