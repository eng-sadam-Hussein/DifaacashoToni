import { LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import clsx from "clsx";

import BrandLogo from "./BrandLogo";
import { navigationGroups } from "../../config/navigation";
import useAuthStore from "../../store/authStore";

export default function Sidebar({
  mobileOpen,
  onMobileClose,
}) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const visibleGroups = navigationGroups
    .map((group) => ({
      ...group,

      items: group.items.filter((item) =>
        item.roles.includes(user?.role)
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-white shadow-xl transition-transform duration-200 lg:z-30 lg:translate-x-0 lg:border-r lg:border-border lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-17 items-center justify-between border-b border-border px-5">
          <BrandLogo />

          <button
            type="button"
            onClick={onMobileClose}
            className="rounded-lg p-2 text-muted hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
          {visibleGroups.map((group) => (
            <section key={group.label} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onMobileClose}
                      className={({ isActive }) =>
                        clsx(
                          "flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition",
                          isActive
                            ? "bg-primary-light text-primary"
                            : "text-body hover:bg-slate-100 hover:text-heading"
                        )
                      }
                    >
                      <Icon size={18} />

                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {user?.fullName?.charAt(0) || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-heading">
                {user?.fullName}
              </p>

              <p className="truncate text-xs text-muted">
                {user?.roleLabel}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger transition hover:bg-red-50"
          >
            <LogOut size={18} />

            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}