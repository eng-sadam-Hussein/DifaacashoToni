import { Outlet } from "react-router";
import BrandLogo from "../components/layout/BrandLogo";

export default function ExternalGuestLayout() {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-17 max-w-6xl items-center px-4 md:px-6">
          <BrandLogo />
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}