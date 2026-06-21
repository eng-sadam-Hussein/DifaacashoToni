export default function Panel({
  title,
  description,
  actions,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-card border border-line bg-surface shadow-card ${className}`}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-bold text-fg">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs text-muted">
                {description}
              </p>
            )}
          </div>

          {actions}
        </header>
      )}

      {children}
    </section>
  );
}