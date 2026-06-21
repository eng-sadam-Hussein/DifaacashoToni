import { FileQuestion } from "lucide-react";
import { useNavigate } from "react-router";

import Button from "../../components/common/Button";
import BrandLogo from "../../components/layout/BrandLogo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-page p-5">
      <div className="w-full max-w-lg text-center">
        <div className="mb-10 flex justify-center">
          <BrandLogo />
        </div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-light text-primary">
          <FileQuestion size={38} />
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Error 404
        </p>

        <h1 className="mt-2 text-3xl font-bold text-heading">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          The page you requested does not exist, was moved, or you
          may not have permission to access it.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/app/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}