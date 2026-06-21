import { useState } from "react";

import {
  CheckCircle2,
  Clock3,
  Copy,
  KeyRound,
  Link2,
  LockKeyhole,
  Mail,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import StatusBadge from "../../components/common/StatusBadge";

export default function SharingCenterPage({
  mode = "new",
}) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    file: "Q2 Financial Report.pdf",
    recipient: "",
    permission: "View and Download",
    expiry: "7 days",
    passwordProtected: true,
    otpRequired: true,
    downloadLimit: 3,
  });

  if (mode === "links") {
    const links = [
      {
        id: "LNK-101",
        file: "Q2 Financial Report.pdf",
        recipient: "External Auditor",
        expires: "Jun 28, 2026",
        downloads: "1 / 3",
        status: "Active",
      },
      {
        id: "LNK-102",
        file: "Supplier Agreement.docx",
        recipient: "Partner Company",
        expires: "Jun 23, 2026",
        downloads: "2 / 2",
        status: "Expired",
      },
    ];

    return (
      <section className="page-container">
        <PageHeader
          eyebrow="External Sharing"
          title="Secure Links"
          description="Manage protected links, access limits and expiration rules."
          accent="orange"
          actions={
            <button
              type="button"
              className="orange-button"
            >
              <Link2 size={17} />
              Create Secure Link
            </button>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {links.map((link) => (
            <article
              key={link.id}
              className="app-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-brand-orange">
                  <Link2 size={21} />
                </div>

                <StatusBadge
                  status={
                    link.status === "Active"
                      ? "active"
                      : "warning"
                  }
                >
                  {link.status}
                </StatusBadge>
              </div>

              <h2 className="mt-5 font-bold text-fg">
                {link.file}
              </h2>

              <p className="mt-1 text-sm text-muted">
                {link.recipient}
              </p>

              <div className="mt-5 space-y-3 rounded-xl bg-elevated p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">
                    Expires
                  </span>

                  <span className="font-semibold text-fg">
                    {link.expires}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">
                    Downloads
                  </span>

                  <span className="font-semibold text-fg">
                    {link.downloads}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast.success(
                    "Secure link copied."
                  )
                }
                className="secondary-button mt-4 w-full"
              >
                <Copy size={17} />
                Copy Link
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (mode === "requests") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Access Governance"
          title="Access Requests"
          description="Review requests for access to protected files and folders."
          accent="green"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              user: "Ali Mohamed",
              file: "Supplier Agreement.docx",
              reason:
                "Required for procurement review.",
              permission: "View Only",
            },
            {
              user: "Sahra Ahmed",
              file: "Employee Policy Manual.pdf",
              reason:
                "Required for HR policy update.",
              permission: "View and Download",
            },
          ].map((request) => (
            <article
              key={request.user}
              className="app-card p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-brand-green">
                  <Users size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-fg">
                    {request.user}
                  </h2>

                  <p className="text-sm text-muted">
                    {request.file}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-elevated p-4">
                <p className="text-xs font-bold uppercase text-muted">
                  Business justification
                </p>

                <p className="mt-2 text-sm text-fg">
                  {request.reason}
                </p>
              </div>

              <p className="mt-4 text-sm text-muted">
                Requested permission:
                <span className="ml-2 font-semibold text-fg">
                  {request.permission}
                </span>
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  className="green-button flex-1"
                >
                  Approve
                </button>

                <button
                  type="button"
                  className="secondary-button flex-1"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const createShare = () => {
    toast.success(
      "Secure sharing request created successfully."
    );
  };

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Protected Collaboration"
        title="Secure Share Wizard"
        description="Configure recipients, permissions, expiry and security controls."
        accent="orange"
      />

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          ["1", "Recipients"],
          ["2", "Permissions"],
          ["3", "Review"],
        ].map(([number, label]) => (
          <button
            key={number}
            type="button"
            onClick={() => setStep(Number(number))}
            className={`rounded-xl border p-4 text-left ${
              step === Number(number)
                ? "border-brand-orange bg-orange-500/10"
                : "border-line bg-surface"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step === Number(number)
                  ? "bg-brand-orange text-white"
                  : "bg-elevated text-muted"
              }`}
            >
              {number}
            </span>

            <p className="mt-3 text-sm font-semibold text-fg">
              {label}
            </p>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Panel>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Select File
                  </label>

                  <select
                    className="app-input"
                    value={form.file}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        file: event.target.value,
                      })
                    }
                  >
                    <option>
                      Q2 Financial Report.pdf
                    </option>
                    <option>
                      Supplier Agreement.docx
                    </option>
                    <option>
                      Employee Payroll June.xlsx
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Recipient Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />

                    <input
                      className="app-input pl-12"
                      placeholder="recipient@company.com"
                      value={form.recipient}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          recipient:
                            event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="orange-button"
                >
                  Continue to Permissions
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Permission
                  </label>

                  <select
                    className="app-input"
                    value={form.permission}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        permission:
                          event.target.value,
                      })
                    }
                  >
                    <option>View Only</option>
                    <option>
                      View and Download
                    </option>
                    <option>Edit</option>
                    <option>Reshare</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Expiration
                  </label>

                  <select
                    className="app-input"
                    value={form.expiry}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        expiry: event.target.value,
                      })
                    }
                  >
                    <option>24 hours</option>
                    <option>3 days</option>
                    <option>7 days</option>
                    <option>30 days</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Download Limit
                  </label>

                  <input
                    type="number"
                    min="0"
                    className="app-input"
                    value={form.downloadLimit}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        downloadLimit:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-line bg-elevated p-4">
                  <input
                    type="checkbox"
                    checked={form.passwordProtected}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        passwordProtected:
                          event.target.checked,
                      })
                    }
                    className="mt-1 accent-orange-500"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-fg">
                      Password protection
                    </span>

                    <span className="text-xs text-muted">
                      Require a separate password.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-line bg-elevated p-4">
                  <input
                    type="checkbox"
                    checked={form.otpRequired}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        otpRequired:
                          event.target.checked,
                      })
                    }
                    className="mt-1 accent-orange-500"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-fg">
                      Email OTP verification
                    </span>

                    <span className="text-xs text-muted">
                      Verify recipient identity.
                    </span>
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="orange-button"
                >
                  Review Secure Share
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-brand-green">
                  <ShieldCheck size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-fg">
                  Review Security Controls
                </h2>

                <div className="mt-5 divide-y divide-line rounded-xl border border-line bg-elevated">
                  {[
                    ["File", form.file],
                    [
                      "Recipient",
                      form.recipient ||
                        "No recipient entered",
                    ],
                    ["Permission", form.permission],
                    ["Expires", form.expiry],
                    [
                      "Password",
                      form.passwordProtected
                        ? "Required"
                        : "Not required",
                    ],
                    [
                      "OTP",
                      form.otpRequired
                        ? "Required"
                        : "Not required",
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 px-4 py-3 text-sm"
                    >
                      <span className="text-muted">
                        {label}
                      </span>

                      <span className="text-right font-semibold text-fg">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={createShare}
                  className="green-button mt-5 w-full"
                >
                  <CheckCircle2 size={18} />
                  Create Secure Share
                </button>
              </div>
            )}
          </div>
        </Panel>

        <Panel
          title="Security Summary"
          description="Controls applied to this share"
        >
          <div className="space-y-4 p-5">
            {[
              {
                icon: LockKeyhole,
                title: "Encrypted transfer",
                detail:
                  "Content remains encrypted during transfer.",
              },
              {
                icon: KeyRound,
                title: "Recipient verification",
                detail:
                  "Identity validation protects access.",
              },
              {
                icon: Clock3,
                title: "Automatic expiration",
                detail:
                  "Access ends when the share expires.",
              },
              {
                icon: ShieldCheck,
                title: "Complete audit trail",
                detail:
                  "Every access event is recorded.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl bg-elevated p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-brand-orange">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-fg">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </section>
  );
}