import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Clock3,
  MailCheck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import AuthImageSlider from "../../components/auth/AuthImageSlider";
import OtpInput from "../../components/auth/OtpInput";
import useAuthStore from "../../store/authStore";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const pendingAuth = useAuthStore(
    (state) => state.pendingAuth
  );

  const verifyOtp = useAuthStore(
    (state) => state.verifyOtp
  );

  const resendOtp = useAuthStore(
    (state) => state.resendOtp
  );

  const clearPendingAuthentication =
    useAuthStore(
      (state) =>
        state.clearPendingAuthentication
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

  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] =
    useState(60);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (seconds <= 0) {
      return undefined;
    }

    const intervalId = window.setInterval(
      () => {
        setSeconds(
          (current) => current - 1
        );
      },
      1000
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [seconds]);

  if (!pendingAuth?.challengeId) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      toast.error(
        "Enter the complete six-digit code."
      );

      return;
    }

    try {
      const user = await verifyOtp(otp);

      toast.success(
        "Identity verified successfully."
      );

      navigate(
        location.state?.from ||
          user.dashboardPath ||
          "/app/dashboard",
        {
          replace: true,
        }
      );
    } catch {
      // Error is displayed from authStore.
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp();

      setOtp("");
      setSeconds(60);

      toast.success(
        "A new verification code was sent."
      );
    } catch {
      // Error is displayed from authStore.
    }
  };

  const handleBack = () => {
    clearPendingAuthentication();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="fixed inset-0 grid h-dvh w-full overflow-hidden bg-white lg:grid-cols-[1.08fr_0.92fr]">
      <AuthImageSlider />

      <section className="relative flex h-dvh min-h-0 items-center justify-center overflow-y-auto bg-white px-5 py-5 sm:px-8 lg:overflow-hidden lg:px-10 xl:px-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative z-10 w-full max-w-[450px]">
          <button
            type="button"
            onClick={handleBack}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to sign in
          </button>

          <header className="mb-7">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <MailCheck size={28} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Identity verification
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Enter security code
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A six-digit code was sent to{" "}
              <strong className="text-slate-800">
                {pendingAuth.maskedDestination ||
                  "your registered contact"}
              </strong>
              .
            </p>
          </header>

          {storeError && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {storeError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <OtpInput
              value={otp}
              disabled={isSubmitting}
              hasError={Boolean(storeError)}
              onChange={(value) => {
                setOtp(value);
                clearError();
              }}
            />

            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 size={15} />
                Code expires shortly
              </span>

              {seconds > 0 ? (
                <span className="text-xs font-semibold text-slate-400">
                  Resend in {seconds}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                >
                  <RotateCcw size={14} />
                  Resend code
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                otp.length !== 6
              }
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Verify and Continue
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}