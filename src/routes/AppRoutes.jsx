import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import ExternalGuestLayout from "../layouts/ExternalGuestLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/errors/NotFoundPage";
import SystemPage from "../pages/common/SystemPage";

import { systemPages } from "../config/systemPages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to="/login" replace />
        }
      />

      {/* Public authentication */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Route>
      </Route>

      {/* External guest */}
      <Route element={<ExternalGuestLayout />}>
        <Route
          path="/external/share/:token"
          element={
            <SystemPage
              {...systemPages.secureShare}
            />
          }
        />
      </Route>

      {/* Protected system */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/app"
          element={<AppLayout />}
        >
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

          {/* Files */}
          <Route
            path="files"
            element={
              <SystemPage
                {...systemPages.myFiles}
              />
            }
          />

          <Route
            path="files/upload"
            element={
              <SystemPage
                {...systemPages.upload}
              />
            }
          />

          <Route
            path="files/shared-with-me"
            element={
              <SystemPage
                {...systemPages.sharedWithMe}
              />
            }
          />

          <Route
            path="files/shared-by-me"
            element={
              <SystemPage
                {...systemPages.sharedByMe}
              />
            }
          />

          <Route
            path="files/recent"
            element={
              <SystemPage
                {...systemPages.recentFiles}
              />
            }
          />

          <Route
            path="files/favorites"
            element={
              <SystemPage
                {...systemPages.favorites}
              />
            }
          />

          <Route
            path="files/trash"
            element={
              <SystemPage
                {...systemPages.trash}
              />
            }
          />

          <Route
            path="files/:fileId"
            element={
              <SystemPage
                {...systemPages.fileDetails}
              />
            }
          />

          <Route
            path="files/:fileId/versions"
            element={
              <SystemPage
                {...systemPages.versionHistory}
              />
            }
          />

          <Route
            path="folders"
            element={
              <SystemPage
                {...systemPages.folders}
              />
            }
          />

          <Route
            path="folders/:folderId"
            element={
              <SystemPage
                {...systemPages.folders}
              />
            }
          />

          {/* Sharing */}
          <Route
            path="share/new"
            element={
              <SystemPage
                {...systemPages.secureShare}
              />
            }
          />

          <Route
            path="secure-links"
            element={
              <SystemPage
                {...systemPages.secureLinks}
              />
            }
          />

          <Route
            path="secure-links/:linkId"
            element={
              <SystemPage
                {...systemPages.secureLinks}
              />
            }
          />

          <Route
            path="access-requests"
            element={
              <SystemPage
                {...systemPages.accessRequests}
              />
            }
          />

          {/* Approvals */}
          <Route
            path="approvals"
            element={
              <SystemPage
                {...systemPages.approvals}
              />
            }
          />

          <Route
            path="approvals/:requestId"
            element={
              <SystemPage
                {...systemPages.approvals}
              />
            }
          />

          {/* Security */}
          <Route
            path="security/monitoring"
            element={
              <SystemPage
                {...systemPages.monitoring}
              />
            }
          />

          <Route
            path="security/alerts/:alertId"
            element={
              <SystemPage
                {...systemPages.alertDetails}
              />
            }
          />

          <Route
            path="security/audit-logs"
            element={
              <SystemPage
                {...systemPages.auditLogs}
              />
            }
          />

          <Route
            path="security/encryption"
            element={
              <SystemPage
                {...systemPages.encryption}
              />
            }
          />

          <Route
            path="security/integrity"
            element={
              <SystemPage
                {...systemPages.integrity}
              />
            }
          />

          <Route
            path="security/sessions"
            element={
              <SystemPage
                {...systemPages.sessions}
              />
            }
          />

          {/* Administration */}
          <Route
            path="admin/users"
            element={
              <SystemPage
                {...systemPages.users}
              />
            }
          />

          <Route
            path="admin/users/:userId"
            element={
              <SystemPage
                {...systemPages.userDetails}
              />
            }
          />

          <Route
            path="admin/roles"
            element={
              <SystemPage
                {...systemPages.roles}
              />
            }
          />

          <Route
            path="admin/roles/:roleId"
            element={
              <SystemPage
                {...systemPages.roles}
              />
            }
          />

          <Route
            path="admin/departments"
            element={
              <SystemPage
                {...systemPages.departments}
              />
            }
          />

          <Route
            path="admin/departments/:departmentId"
            element={
              <SystemPage
                {...systemPages.departments}
              />
            }
          />

          <Route
            path="admin/categories"
            element={
              <SystemPage
                {...systemPages.categories}
              />
            }
          />

          <Route
            path="admin/storage"
            element={
              <SystemPage
                {...systemPages.storage}
              />
            }
          />

          {/* Reports and settings */}
          <Route
            path="reports"
            element={
              <SystemPage
                {...systemPages.reports}
              />
            }
          />

          <Route
            path="settings"
            element={
              <SystemPage
                {...systemPages.settings}
              />
            }
          />

          <Route
            path="system-health"
            element={
              <SystemPage
                {...systemPages.systemHealth}
              />
            }
          />

          {/* Personal */}
          <Route
            path="notifications"
            element={
              <SystemPage
                {...systemPages.notifications}
              />
            }
          />

          <Route
            path="profile"
            element={
              <SystemPage
                {...systemPages.profile}
              />
            }
          />

          <Route
            path="preferences"
            element={
              <SystemPage
                {...systemPages.settings}
              />
            }
          />

          <Route
            path="help"
            element={
              <SystemPage
                {...systemPages.help}
              />
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}