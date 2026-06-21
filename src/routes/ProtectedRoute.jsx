import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router";

import useAuthStore from "../store/authStore";

export default function ProtectedRoute() {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const isInitializing = useAuthStore(
    (state) => state.isInitializing
  );

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-600 border-r-transparent" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  return <Outlet />;
}