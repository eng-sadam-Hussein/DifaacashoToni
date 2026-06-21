import { Outlet } from "react-router";

export default function ExternalGuestLayout() {
  return (
    <main className="min-h-screen bg-page">
      <Outlet />
    </main>
  );
}