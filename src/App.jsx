import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "10px",
            border: "1px solid #e4e7ec",
            color: "#172033",
          },
        }}
      />
    </>
  );
}