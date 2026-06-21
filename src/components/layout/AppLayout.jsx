import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-page">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[270px]">
        <Topbar
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="min-h-[calc(100vh-68px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}