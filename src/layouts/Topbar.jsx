import { LogOut, X } from "lucide-react";
import {
  NavLink,
  useNavigate,
} from "react-router";

import BrandLogo from "./BrandLogo";
import useAuthStore from "../../store/authStore";
import { navigationGroups } from "../../config/navigation";

export default function Sidebar({
  mobileOpen,
  onClose,
}) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const visibleGroups = navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.roles.includes(user?.role)
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[285px] flex-col border-r border-line bg-surface transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
          <BrandLogo />

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted hover:bg-elevated lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
          {visibleGroups.map((group) => (
            <section
              key={group.label}
              className="mb-6"
            >
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-blue-500/10 text-brand-blue"
                            : "text-muted hover:bg-elevated hover:text-fg"
                        }`
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

        <div className="border-t border-line p-3">
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-elevated p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green text-sm font-bold text-white">
              {user?.fullName?.charAt(0) || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}