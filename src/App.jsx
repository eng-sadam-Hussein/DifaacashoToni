import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import useAuthStore from "./store/authStore";

export default function App() {
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleSessionExpired = async () => {
      await logout();

      window.location.replace(
        "/login?reason=session-expired"
      );
    };

    window.addEventListener(
      "afess:session-expired",
      handleSessionExpired
    );

    return () => {
      window.removeEventListener(
        "afess:session-expired",
        handleSessionExpired
      );
    };
  }, [logout]);

  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            color: "#0f172a",
          },
        }}
      />
    </>
  );
}