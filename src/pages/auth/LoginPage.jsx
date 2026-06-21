import { useEffect, useState } from "react";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  FolderLock,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import AuthImageSlider from "../../components/auth/AuthImageSlider";
import authService from "../../services/authService";
import useAuthStore from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore(
    (state) => state.login
  );

  const clearError = useAuthStore(
    (state) => state.clearError
  );

  const isSubmitting = useAuthStore(
    (state) => state.isSubmitting
  );

  const storeError = useAuthStore(
    (state) => state.error
  );

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    rememberDevice: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [validationErrors, setValidationErrors] =
    useState({});

  useEffect(() => {
    clearError();
  }, [clearError]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setValidationErrors((current) => ({
      ...current,
      [field]: "",
    }));

    clearError();
  };

  const validateForm = () => {
    const errors = {};

    if (!form.identifier.trim()) {
      errors.identifier =
        "Username or corporate email is required.";
    }

    if (!form.password) {
      errors.password =
        "Password is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getDestination = (user) => {
    const requestedPage =
      location.state?.from;

    if (
      typeof requestedPage === "string" &&
      requestedPage.startsWith("/app")
    ) {
      return requestedPage;
    }

    return (
      user.dashboardPath ||
      "/app/dashboard"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(form);

      if (result.requiresOtp) {
        toast.success(
          "A verification code has been sent."
        );

        navigate("/verify-otp", {
          replace: true,
          state: {
            from: location.state?.from,
          },
        });

        return;
      }

      toast.success(
        `Welcome, ${result.user.fullName}`
      );

      navigate(
        getDestination(result.user),
        {
          replace: true,
        }
      );
    } catch {
      /*
       * Error message is rendered from authStore.
       */
    }
  };

  const handleGoogleLogin = () => {
    window.location.assign(
      authService.getGoogleLoginUrl()
    );
  };

  return (
    <main className="fixed inset-0 grid h-dvh w-full overflow-hidden bg-white lg:grid-cols-[1.08fr_0.92fr]">
      <AuthImageSlider />

      <section className="relative flex h-dvh min-h-0 items-center justify-center overflow-y-auto bg-white px-5 py-5 sm:px-8 lg:overflow-hidden lg:px-10 xl:px-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-100/50 blur-3xl" />

        <div className="relative z-10 w-full max-w-[450px]">
          <header className="mb-6">
            <div className="mb-5 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-green-600 to-orange-500 text-white shadow-lg">
                <FolderLock size={23} />
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  AFESS SecureShare
                </p>

                <p className="text-xs text-slate-500">
                  Corporate Data Protection
                </p>
              </div>
            </div>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck size={23} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Secure corporate access
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Sign in to access encrypted files, secure sharing,
              approvals and security services.
            </p>
          </header>

          {storeError && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                !
              </div>

              <p className="text-sm leading-5 text-red-700">
                {storeError}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Username or corporate email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={form.identifier}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    updateField(
                      "identifier",
                      event.target.value
                    )
                  }
                  placeholder="Enter username or email"
                  autoComplete="username"
                  aria-invalid={
                    Boolean(
                      validationErrors.identifier
                    )
                  }
                  className={`h-12 w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 ${
                    validationErrors.identifier
                      ? "border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  }`}
                />
              </div>

              {validationErrors.identifier && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {validationErrors.identifier}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    updateField(
                      "password",
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={
                    Boolean(
                      validationErrors.password
                    )
                  }
                  className={`h-12 w-full rounded-xl border bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 ${
                    validationErrors.password
                      ? "border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  disabled={isSubmitting}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {validationErrors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={
                    form.rememberDevice
                  }
                  disabled={isSubmitting}
                  onChange={(event) =>
                    updateField(
                      "rememberDevice",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                />

                Remember this device
              </label>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                <CheckCircle2 size={14} />
                Secure connection
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Login
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleGoogleLogin}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white font-bold">
              G
            </span>

            Continue with Google Workspace
          </button>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
            <p className="text-xs font-semibold text-slate-800">
              Protected corporate environment
            </p>

            <p className="mt-1 text-[11px] leading-4 text-slate-500">
              Access is protected through authentication,
              authorization, encryption and continuous monitoring.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}