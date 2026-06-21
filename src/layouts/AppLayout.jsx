import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-page">
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-navy text-white lg:block">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-lg font-bold">AFESS SecureShare</h2>
          <p className="mt-1 text-xs text-white/65">
            Corporate Data Protection
          </p>
        </div>

        <nav className="p-4 text-sm">
          Sidebar navigation will be implemented from the Stitch design.
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-white px-4 lg:px-6">
          <h1 className="font-semibold text-heading">
            AFESS SecureShare
          </h1>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}