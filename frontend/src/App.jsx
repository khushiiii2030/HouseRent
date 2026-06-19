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

// RENTER
import RenterHome from "./modules/user/renter/RenterHome";
import RenterProperties from "./modules/user/renter/AllProperties";
import RenterBookings from "./modules/user/renter/AllBookings";
import RenterDashboard from "./modules/user/renter/RenterDashboard";
import Wishlist from "./modules/user/renter/Wishlist";
import Profile from "./modules/user/renter/Profile";

// AUTH
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";

// PROTECTED
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login role="user" />} />
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

      {/* OWNER */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerHome />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerDashboard />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="properties" element={<OwnerProperties />} />
        <Route path="bookings" element={<OwnerBookings />} />
      </Route>

      {/* RENTER (CLEAN STRUCTURE) */}
      <Route
        path="/renter"
        element={
          <ProtectedRoute role="user">
            <RenterHome />
          </ProtectedRoute>
        }
      >
        <Route index element={<RenterDashboard />} />
        <Route path="properties" element={<RenterProperties />} />
        <Route path="bookings" element={<RenterBookings />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}