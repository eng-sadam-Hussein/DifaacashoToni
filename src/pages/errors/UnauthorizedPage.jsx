import { ShieldX } from "lucide-react";
import { useNavigate } from "react-router";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-600">
          <ShieldX size={38} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-fg">
          Access Denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Your current role does not have permission to access
          this page.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/app/dashboard")
          }
          className="primary-button mt-6"
        >
          Return to Dashboard
        </button>
      </div>
    </main>
  );
}