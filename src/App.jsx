import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
            border:
              "1px solid rgb(var(--border-color))",
            background:
              "rgb(var(--surface-bg))",
            color: "rgb(var(--text-main))",
          },
        }}
      />
    </ThemeProvider>
  );
}