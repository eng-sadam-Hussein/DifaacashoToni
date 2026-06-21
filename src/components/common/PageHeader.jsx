export default function PageHeader({
  eyebrow,
  title,
  description,
  accent = "blue",
  actions,
}) {
  const accentClasses = {
    blue: "bg-blue-500/10 text-brand-blue",
    green: "bg-green-500/10 text-brand-green",
    orange: "bg-orange-500/10 text-brand-orange",
  };

  return (
    <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        {eyebrow && (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              accentClasses[accent]
            }`}
          >
            {eyebrow}
          </span>
        )}

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-fg md:text-3xl">
          {title}
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}