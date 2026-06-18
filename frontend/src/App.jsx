import { Routes, Route } from "react-router-dom";

import AdminHome from "./modules/admin/AdminHome";
import AllUsers from "./modules/admin/AllUsers";
import AllProperties from "./modules/admin/AllProperties";
import AllBookings from "./modules/admin/AllBookings";

import AdminDashboard from "./modules/admin/AdminDashboard";

import Login from "./modules/common/Login";
import Register from "./modules/common/Register";

import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* 🔐 LOGIN (SAFE DEFAULT) */}
      <Route path="/login" element={<Login role="user" />} />

      {/* ROLE LOGIN OPTIONS */}
      <Route path="/login/admin" element={<Login role="admin" />} />
      <Route path="/login/owner" element={<Login role="owner" />} />
      <Route path="/login/renter" element={<Login role="user" />} />

      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
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

    </Routes>
  );
}