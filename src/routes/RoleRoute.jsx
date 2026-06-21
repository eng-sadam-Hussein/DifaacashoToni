import { Navigate } from "react-router";

import useAuthStore from "../store/authStore";

export default function RoleRoute({
  allowedRoles = [],
  children,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/app/unauthorized"
        replace
      />
    );
  }

  return children;
}