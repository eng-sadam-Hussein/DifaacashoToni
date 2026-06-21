const statusStyles = {
  active:
    "bg-green-500/10 text-brand-green ring-green-500/20",
  encrypted:
    "bg-green-500/10 text-brand-green ring-green-500/20",
  approved:
    "bg-green-500/10 text-brand-green ring-green-500/20",
  healthy:
    "bg-green-500/10 text-brand-green ring-green-500/20",

  pending:
    "bg-orange-500/10 text-brand-orange ring-orange-500/20",
  warning:
    "bg-orange-500/10 text-brand-orange ring-orange-500/20",

  critical:
    "bg-red-500/10 text-red-600 ring-red-500/20",
  blocked:
    "bg-red-500/10 text-red-600 ring-red-500/20",
  restricted:
    "bg-red-500/10 text-red-600 ring-red-500/20",

  shared:
    "bg-blue-500/10 text-brand-blue ring-blue-500/20",
  internal:
    "bg-slate-500/10 text-muted ring-slate-500/20",
};

export default function StatusBadge({
  children,
  status,
}) {
  const normalized = String(
    status || children || ""
  ).toLowerCase();

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[normalized] ||
        "bg-slate-500/10 text-muted ring-slate-500/20"
      }`}
    >
      {children}
    </span>
  );
}