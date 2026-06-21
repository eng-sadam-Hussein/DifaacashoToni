import {
  Navigate,
  Outlet,
} from "react-router";

import useAuthStore from "../store/authStore";

export default function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const isInitializing = useAuthStore(
    (state) => state.isInitializing
  );

  const user = useAuthStore(
    (state) => state.user
  );

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-r-transparent" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Navigate
        to={
          user.dashboardPath ||
          "/app/dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}