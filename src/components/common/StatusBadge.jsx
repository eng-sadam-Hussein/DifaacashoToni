import clsx from "clsx";

const badgeStyles = {
  encrypted: "bg-green-50 text-green-700 ring-green-600/20",
  active: "bg-green-50 text-green-700 ring-green-600/20",
  approved: "bg-green-50 text-green-700 ring-green-600/20",
  healthy: "bg-green-50 text-green-700 ring-green-600/20",

  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",

  confidential: "bg-orange-50 text-orange-700 ring-orange-600/20",
  "highly confidential":
    "bg-orange-50 text-orange-700 ring-orange-600/20",

  restricted: "bg-red-50 text-red-700 ring-red-600/20",
  failed: "bg-red-50 text-red-700 ring-red-600/20",
  critical: "bg-red-50 text-red-700 ring-red-600/20",

  public: "bg-blue-50 text-blue-700 ring-blue-600/20",
  internal: "bg-slate-100 text-slate-700 ring-slate-600/20",

  shared: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",

  default: "bg-slate-100 text-slate-700 ring-slate-600/20",
};

export default function StatusBadge({
  children,
  status,
  className = "",
}) {
  const normalizedStatus = String(status || children || "")
    .trim()
    .toLowerCase();

  const style =
    badgeStyles[normalizedStatus] || badgeStyles.default;

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        style,
        className
      )}
    >
      {children}
    </span>
  );
}