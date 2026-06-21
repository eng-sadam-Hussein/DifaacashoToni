import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileLock2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

import BrandLogo from "../../components/layout/BrandLogo";
import Button from "../../components/common/Button";
import useAuthStore from "../../store/authStore";

const demoAccounts = [
  {
    role: "Super Admin",
    email: "super.admin@afess.com",
  },
  {
    role: "Organization Admin",
    email: "admin@afess.com",
  },
  {
    role: "Security Officer",
    email: "security@afess.com",
  },
  {
    role: "Department Manager",
    email: "manager@afess.com",
  },
  {
    role: "Employee",
    email: "employee@afess.com",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState(
    "admin@afess.com"
  );

  const [password, setPassword] = useState(
    "Secure@123"
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberDevice, setRememberDevice] =
    useState(true);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      await login({
        email,
        password,
        rememberDevice,
      });

      toast.success("Signed in successfully.");

      const redirectPath =
        location.state?.from || "/app/dashboard";

      navigate(redirectPath, {
        replace: true,
      });
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-navy px-12 py-10 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,94,215,0.45),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(22,163,74,0.3),transparent_35%)]" />

        <div className="relative z-10">
          <BrandLogo light />
        </div>

        <div className="relative z-10 my-auto max-w-xl">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <FileLock2 size={32} />
          </div>

          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Protect Every File.
            <br />
            Control Every Share.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
            Automatically encrypt, organize, monitor, and securely
            share sensitive corporate information from one trusted
            platform.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              "AES-256 file protection",
              "Role-based access control",
              "Secure approval workflow",
              "Continuous activity monitoring",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <CheckCircle2
                  size={18}
                  className="text-green-400"
                />

                {feature}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/45">
          AFESS SecureShare · Corporate Data Protection
        </p>
      </section>

      <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-primary">
              Secure corporate access
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-heading">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Sign in to access encrypted files and secure sharing
              services.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-heading"
              >
                Email or username
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your corporate email"
                  autoComplete="username"
                  className="h-11 w-full rounded-lg border border-border bg-white pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-heading"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-border bg-white pl-11 pr-11 text-sm text-heading outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:bg-slate-100"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-body">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(event) =>
                  setRememberDevice(event.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 accent-primary"
              />

              Remember this device
            </label>

            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              <ShieldCheck size={18} />

              Sign In Securely
            </Button>
          </form>

          <div className="mt-7 rounded-xl border border-border bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Demo accounts
            </p>

            <div className="mt-3 space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword("Secure@123");
                    setError("");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition hover:bg-white"
                >
                  <span className="font-medium text-body">
                    {account.role}
                  </span>

                  <span className="text-primary">
                    {account.email}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted">
              Password for every demo account:
              <span className="ml-1 font-semibold text-heading">
                Secure@123
              </span>
            </p>
          </div>

          <p className="mt-7 text-center text-xs leading-5 text-muted">
            Protected by encrypted authentication, access controls,
            and continuous activity monitoring.
          </p>
        </div>
      </section>
    </div>
  );
}