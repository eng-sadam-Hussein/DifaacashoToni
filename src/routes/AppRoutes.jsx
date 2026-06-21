import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import RoleRoute from "./RoleRoute";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

import FilesWorkspacePage from "../pages/files/FilesWorkspacePage";
import UploadCenterPage from "../pages/files/UploadCenterPage";

import SharingCenterPage from "../pages/sharing/SharingCenterPage";
import ApprovalCenterPage from "../pages/approvals/ApprovalCenterPage";

import SecurityCenterPage from "../pages/security/SecurityCenterPage";
import AdminCenterPage from "../pages/admin/AdminCenterPage";

import ReportsPage from "../pages/reports/ReportsPage";
import SettingsPage from "../pages/settings/SettingsPage";

import AccountPage from "../pages/account/AccountPage";
import HelpPage from "../pages/help/HelpPage";

import UnauthorizedPage from "../pages/errors/UnauthorizedPage";
import NotFoundPage from "../pages/errors/NotFoundPage";

const securityRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
];

const adminRoles = [
  "super_admin",
  "organization_admin",
];

const managerRoles = [
  "super_admin",
  "organization_admin",
  "security_officer",
  "department_manager",
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={
              <Navigate
                to="/app/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="files"
            element={
              <FilesWorkspacePage mode="mine" />
            }
          />

          <Route
            path="files/upload"
            element={<UploadCenterPage />}
          />

          <Route
            path="files/shared-with-me"
            element={
              <FilesWorkspacePage mode="sharedWithMe" />
            }
          />

          <Route
            path="files/shared-by-me"
            element={
              <FilesWorkspacePage mode="sharedByMe" />
            }
          />

          <Route
            path="files/recent"
            element={
              <FilesWorkspacePage mode="recent" />
            }
          />

          <Route
            path="files/favorites"
            element={
              <FilesWorkspacePage mode="favorites" />
            }
          />

          <Route
            path="files/trash"
            element={
              <FilesWorkspacePage mode="trash" />
            }
          />

          <Route
            path="files/:fileId"
            element={
              <FilesWorkspacePage mode="mine" />
            }
          />

          <Route
            path="files/:fileId/versions"
            element={
              <FilesWorkspacePage mode="recent" />
            }
          />

          <Route
            path="folders"
            element={
              <FilesWorkspacePage mode="folders" />
            }
          />

          <Route
            path="folders/:folderId"
            element={
              <FilesWorkspacePage mode="mine" />
            }
          />

          <Route
            path="share/new"
            element={
              <SharingCenterPage mode="new" />
            }
          />

          <Route
            path="secure-links"
            element={
              <RoleRoute
                allowedRoles={managerRoles}
              >
                <SharingCenterPage mode="links" />
              </RoleRoute>
            }
          />

          <Route
            path="access-requests"
            element={
              <RoleRoute
                allowedRoles={managerRoles}
              >
                <SharingCenterPage mode="requests" />
              </RoleRoute>
            }
          />

          <Route
            path="approvals"
            element={<ApprovalCenterPage />}
          />

          <Route
            path="approvals/:requestId"
            element={<ApprovalCenterPage />}
          />

          <Route
            path="security/monitoring"
            element={
              <RoleRoute
                allowedRoles={securityRoles}
              >
                <SecurityCenterPage mode="monitoring" />
              </RoleRoute>
            }
          />

          <Route
            path="security/audit-logs"
            element={
              <RoleRoute
                allowedRoles={securityRoles}
              >
                <SecurityCenterPage mode="audit" />
              </RoleRoute>
            }
          />

          <Route
            path="security/encryption"
            element={
              <RoleRoute
                allowedRoles={securityRoles}
              >
                <SecurityCenterPage mode="encryption" />
              </RoleRoute>
            }
          />

          <Route
            path="security/integrity"
            element={
              <RoleRoute
                allowedRoles={securityRoles}
              >
                <SecurityCenterPage mode="integrity" />
              </RoleRoute>
            }
          />

          <Route
            path="security/sessions"
            element={
              <SecurityCenterPage mode="sessions" />
            }
          />

          <Route
            path="admin/users"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <AdminCenterPage mode="users" />
              </RoleRoute>
            }
          />

          <Route
            path="admin/roles"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <AdminCenterPage mode="roles" />
              </RoleRoute>
            }
          />

          <Route
            path="admin/departments"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <AdminCenterPage mode="departments" />
              </RoleRoute>
            }
          />

          <Route
            path="admin/categories"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <AdminCenterPage mode="categories" />
              </RoleRoute>
            }
          />

          <Route
            path="admin/storage"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <AdminCenterPage mode="storage" />
              </RoleRoute>
            }
          />

          <Route
            path="reports"
            element={
              <RoleRoute
                allowedRoles={managerRoles}
              >
                <ReportsPage />
              </RoleRoute>
            }
          />

          <Route
            path="settings"
            element={
              <RoleRoute allowedRoles={adminRoles}>
                <SettingsPage />
              </RoleRoute>
            }
          />

          <Route
            path="profile"
            element={<AccountPage mode="profile" />}
          />

          <Route
            path="preferences"
            element={
              <SettingsPage mode="preferences" />
            }
          />

          <Route
            path="notifications"
            element={
              <AccountPage mode="notifications" />
            }
          />

          <Route
            path="help"
            element={<HelpPage />}
          />

          <Route
            path="unauthorized"
            element={<UnauthorizedPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}