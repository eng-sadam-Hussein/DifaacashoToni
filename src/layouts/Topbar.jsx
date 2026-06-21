import {
  Bell,
  ChevronDown,
  HelpCircle,
  Menu,
  Search,
  ShieldAlert,
  Upload,
} from "lucide-react";

import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";

export default function Topbar({
  onOpenSidebar,
}) {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="relative hidden w-full max-w-xl md:block">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search files, users, alerts and resources..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() =>
              navigate("/app/files/upload")
            }
            className="hidden h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex"
          >
            <Upload size={17} />
            Upload File
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/app/security/monitoring"
              )
            }
            className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100"
          >
            <ShieldAlert size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/app/notifications")
            }
            className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100"
          >
            <Bell size={19} />

            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/app/help")
            }
            className="hidden rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 sm:block"
          >
            <HelpCircle size={19} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/app/profile")
            }
            className="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {user?.fullName
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <div className="hidden text-left xl:block">
              <p className="max-w-36 truncate text-xs font-semibold text-slate-900">
                {user?.fullName}
              </p>

              <p className="max-w-36 truncate text-[10px] text-slate-500">
                {user?.roleLabel}
              </p>
            </div>

            <ChevronDown
              size={14}
              className="hidden text-slate-400 xl:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}