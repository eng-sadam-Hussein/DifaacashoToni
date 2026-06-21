import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  KeyRound,
  Laptop,
  LockKeyhole,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import StatusBadge from "../../components/common/StatusBadge";
import { alerts } from "../../data/appData";

const pageMeta = {
  monitoring: {
    title: "Security Monitoring",
    description:
      "Monitor threats, suspicious activity and protection status.",
  },
  audit: {
    title: "Audit Logs",
    description:
      "Review traceable system and user activity events.",
  },
  encryption: {
    title: "Encryption Management",
    description:
      "Monitor encryption coverage, policies and failures.",
  },
  integrity: {
    title: "Integrity Verification",
    description:
      "Detect file modification and validate integrity hashes.",
  },
  sessions: {
    title: "Active Sessions",
    description:
      "Review account devices and revoke unauthorized sessions.",
  },
};

export default function SecurityCenterPage({
  mode = "monitoring",
}) {
  const meta = pageMeta[mode];

  if (mode === "sessions") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Account Security"
          title={meta.title}
          description={meta.description}
          accent="orange"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              device: "Chrome on Windows",
              location: "Mogadishu, Somalia",
              current: true,
              lastActive: "Current session",
            },
            {
              device: "Safari on iPhone",
              location: "Kismayo, Somalia",
              current: false,
              lastActive: "2 hours ago",
            },
          ].map((session) => (
            <article
              key={session.device}
              className="app-card p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-brand-orange">
                  <Laptop size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-fg">
                      {session.device}
                    </h2>

                    {session.current && (
                      <StatusBadge status="active">
                        Current
                      </StatusBadge>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {session.location}
                  </p>

                  <p className="mt-2 text-xs text-muted">
                    {session.lastActive}
                  </p>
                </div>
              </div>

              {!session.current && (
                <button
                  type="button"
                  onClick={() =>
                    toast.success(
                      "Session revoked."
                    )
                  }
                  className="secondary-button mt-5 w-full text-red-600"
                >
                  Revoke Session
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (mode === "encryption") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Cryptographic Protection"
          title={meta.title}
          description={meta.description}
          accent="green"
          actions={
            <button
              type="button"
              className="green-button"
              onClick={() =>
                toast.success(
                  "Encryption scan started."
                )
              }
            >
              <RefreshCw size={17} />
              Run Encryption Scan
            </button>
          }
        />

        <div className="grid gap-5 xl:grid-cols-3">
          <article className="app-card p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-fg">
                  Encryption Coverage
                </h2>

                <p className="text-sm text-muted">
                  Files protected using AES-256-GCM
                </p>
              </div>

              <span className="text-3xl font-bold text-brand-green">
                97.1%
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-elevated">
              <div className="h-full w-[97.1%] rounded-full bg-gradient-to-r from-brand-green to-emerald-400" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Encrypted", "1,247"],
                ["Pending", "31"],
                ["Failed", "6"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-elevated p-4"
                >
                  <p className="text-xs font-bold uppercase text-muted">
                    {label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-fg">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="app-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-brand-green">
              <KeyRound size={22} />
            </div>

            <h2 className="mt-5 font-bold text-fg">
              Key Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Per-file encryption keys are managed by the
              organization security service.
            </p>

            <button
              type="button"
              className="secondary-button mt-5 w-full"
            >
              View Key Policies
            </button>
          </article>
        </div>
      </section>
    );
  }

  if (mode === "integrity") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="File Validation"
          title={meta.title}
          description={meta.description}
          accent="blue"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              label: "Verified Files",
              value: "1,264",
              color:
                "bg-green-500/10 text-brand-green",
            },
            {
              icon: Activity,
              label: "Pending Scan",
              value: "14",
              color:
                "bg-blue-500/10 text-brand-blue",
            },
            {
              icon: AlertTriangle,
              label: "Integrity Alerts",
              value: "02",
              color:
                "bg-orange-500/10 text-brand-orange",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="app-card p-6"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>

                <p className="mt-5 text-sm text-muted">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-bold text-fg">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </div>

        <Panel
          title="Integrity Scan"
          description="Verify stored file hashes"
          className="mt-5"
        >
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-brand-blue">
              <FileCheck2 size={36} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-fg">
              Run Organization Integrity Scan
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
              Compare current file hashes with secure integrity
              records to identify unauthorized modifications.
            </p>

            <button
              type="button"
              className="primary-button mt-6"
              onClick={() =>
                toast.success(
                  "Integrity scan started."
                )
              }
            >
              <LockKeyhole size={18} />
              Start Verification
            </button>
          </div>
        </Panel>
      </section>
    );
  }

  return (
    <section className="page-container">
      <PageHeader
        eyebrow={
          mode === "audit"
            ? "Compliance Records"
            : "Threat Intelligence"
        }
        title={meta.title}
        description={meta.description}
        accent={
          mode === "audit" ? "blue" : "orange"
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Critical Alerts", "02"],
          ["Warnings", "08"],
          ["Blocked Attempts", "19"],
          ["Security Score", "88%"],
        ].map(([label, value], index) => (
          <article
            key={label}
            className="app-card p-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                index === 0
                  ? "bg-red-500/10 text-red-600"
                  : index === 1
                    ? "bg-orange-500/10 text-brand-orange"
                    : index === 2
                      ? "bg-blue-500/10 text-brand-blue"
                      : "bg-green-500/10 text-brand-green"
              }`}
            >
              <ShieldAlert size={19} />
            </div>

            <p className="mt-4 text-xs font-bold uppercase text-muted">
              {label}
            </p>

            <p className="mt-1 text-2xl font-bold text-fg">
              {value}
            </p>
          </article>
        ))}
      </div>

      <Panel
        title={
          mode === "audit"
            ? "Audit Event Stream"
            : "Active Security Alerts"
        }
        className="mt-5"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-elevated">
              <tr>
                {[
                  "Event",
                  "User",
                  "Source",
                  "Severity",
                  "Time",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-left text-xs font-bold uppercase text-muted"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-elevated"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-fg">
                      {alert.title}
                    </p>

                    <p className="text-xs text-muted">
                      {alert.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {alert.user}
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {alert.source}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        alert.severity === "Critical"
                          ? "critical"
                          : "warning"
                      }
                    >
                      {alert.severity}
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {alert.time}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        alert.status === "Blocked"
                          ? "blocked"
                          : "pending"
                      }
                    >
                      {alert.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}