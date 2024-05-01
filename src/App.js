// Import Components
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Page Components
const SignInPage = lazy(() => import("./Pages/SignInPage"));
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const DashboardPage = lazy(() => import("./Pages/DashboardPage"));
const AddToInventoryPage = lazy(() => import("./Pages/AddToInventoryPage"));
const InventoryPage = lazy(() => import("./Pages/InventoryPage"));
const NotificationsPage = lazy(() => import("./Pages/NotificationsPage"));
const ReservationsPage = lazy(() => import("./Pages/ReservationsPage"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage"));
const UsersPage = lazy(() => import("./Pages/UsersPage"));
const VerificationPage = lazy(() => import("./Pages/VerificationPage"));

/*
 * Main Application Component
 * This component serves as the entry point for the application and defines the
 * routing structure for various pages. It uses lazy loading for page components
 * to improve performance. The application routes are defined using the React Router.
 */
function App() {
  return (
    <Router>
      {/* TODO: Loading Page */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/AddToInventory" element={<AddToInventoryPage />} />
          <Route path="/Inventory" element={<InventoryPage />} />
          <Route path="/Notifications" element={<NotificationsPage />} />
          <Route path="/Reservations" element={<ReservationsPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/Users" element={<UsersPage />} />
          <Route path="/Verification" element={<VerificationPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
