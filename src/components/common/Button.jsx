import clsx from "clsx";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus:ring-primary/25",

  success:
    "bg-security text-white hover:bg-green-700 focus:ring-security/25",

  warning:
    "bg-accent text-white hover:bg-orange-600 focus:ring-accent/25",

  danger:
    "bg-danger text-white hover:bg-red-700 focus:ring-danger/25",

  secondary:
    "border border-border bg-white text-heading hover:bg-slate-50 focus:ring-primary/15",

  ghost:
    "bg-transparent text-body hover:bg-slate-100 focus:ring-primary/15",
};

const sizes = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-11 px-5 py-2.5 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-button font-semibold transition",
        "focus:outline-none focus:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}

      {children}
    </button>
  );
}