import { Navigate, Outlet, useLocation } from "react-router";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}