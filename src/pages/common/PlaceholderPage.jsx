import { Construction } from "lucide-react";

export default function PlaceholderPage({
  title,
  description = "This module is prepared and will be implemented in the next development step.",
}) {
  return (
    <section className="p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-heading md:text-3xl">
            {title}
          </h1>

          <p className="mt-1 text-sm text-muted">
            {description}
          </p>
        </div>

        <div className="flex min-h-80 flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Construction size={27} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-heading">
            {title}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            The route and page structure are ready. The complete
            Stitch-based interface will be added during its module
            implementation step.
          </p>
        </div>
      </div>
    </section>
  );
}