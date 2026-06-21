import { Navigate, Route, Routes } from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import ExternalGuestLayout from "../layouts/ExternalGuestLayout";
import ProtectedRoute from "./ProtectedRoute";

const PlaceholderPage = ({ title }) => (
  <section className="p-6">
    <h1 className="text-2xl font-bold text-heading">{title}</h1>

    <div className="mt-6 rounded-card border border-border bg-surface p-6">
      <p className="text-body">
        This AFESS SecureShare page is ready for implementation.
      </p>
    </div>
  </section>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PlaceholderPage title="Landing Page" />} />

      {/* Authentication routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PlaceholderPage title="Sign In" />} />
        <Route
          path="/forgot-password"
          element={<PlaceholderPage title="Forgot Password" />}
        />
        <Route
          path="/verify-otp"
          element={<PlaceholderPage title="Verify OTP" />}
        />
      </Route>

      {/* External Guest */}
      <Route element={<ExternalGuestLayout />}>
        <Route
          path="/external/share/:token"
          element={<PlaceholderPage title="Secure File Access" />}
        />
      </Route>

      {/* Protected application */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
            path="dashboard"
            element={<PlaceholderPage title="Dashboard" />}
          />

          <Route path="files">
            <Route index element={<PlaceholderPage title="My Files" />} />
            <Route
              path="shared-with-me"
              element={<PlaceholderPage title="Shared With Me" />}
            />
            <Route
              path="shared-by-me"
              element={<PlaceholderPage title="Shared By Me" />}
            />
            <Route
              path="recent"
              element={<PlaceholderPage title="Recent Files" />}
            />
            <Route
              path="favorites"
              element={<PlaceholderPage title="Favorites" />}
            />
            <Route path="trash" element={<PlaceholderPage title="Trash" />} />
            <Route
              path=":fileId"
              element={<PlaceholderPage title="File Details" />}
            />
          </Route>

          <Route
            path="approvals"
            element={<PlaceholderPage title="Approval Center" />}
          />

          <Route
            path="secure-links"
            element={<PlaceholderPage title="Secure Links" />}
          />

          <Route
            path="security/monitoring"
            element={<PlaceholderPage title="Security Monitoring" />}
          />

          <Route
            path="security/audit-logs"
            element={<PlaceholderPage title="Audit Logs" />}
          />

          <Route
            path="security/encryption"
            element={<PlaceholderPage title="Encryption Management" />}
          />

          <Route
            path="admin/users"
            element={<PlaceholderPage title="Users" />}
          />

          <Route
            path="admin/roles"
            element={<PlaceholderPage title="Roles and Permissions" />}
          />

          <Route
            path="admin/departments"
            element={<PlaceholderPage title="Departments" />}
          />

          <Route
            path="reports"
            element={<PlaceholderPage title="Reports" />}
          />

          <Route
            path="settings"
            element={<PlaceholderPage title="Organization Settings" />}
          />

          <Route
            path="profile"
            element={<PlaceholderPage title="My Profile" />}
          />

          <Route
            path="notifications"
            element={<PlaceholderPage title="Notifications" />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<PlaceholderPage title="404 — Page Not Found" />}
      />
    </Routes>
  );
}