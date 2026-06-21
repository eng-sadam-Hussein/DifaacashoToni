import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  FileLock2,
  Files,
  FolderPlus,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";

const summaryCards = [
  {
    label: "Total Files",
    value: "1,284",
    note: "+12% this month",
    trend: "up",
    icon: Files,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Encrypted Files",
    value: "1,247",
    note: "97.1% protected",
    trend: "up",
    icon: FileLock2,
    iconClass: "bg-green-50 text-green-600",
  },
  {
    label: "Storage Used",
    value: "450 GB",
    note: "45% of 1 TB",
    icon: Database,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Pending Approvals",
    value: "03",
    note: "Requires review",
    trend: "down",
    icon: Clock3,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

const activityData = [28, 42, 34, 55, 62, 48, 88];

const recentActivities = [
  {
    id: 1,
    user: "Fatima Noor",
    action: "approved secure sharing",
    resource: "Q2 Financial Report.pdf",
    time: "8 minutes ago",
    status: "Approved",
  },
  {
    id: 2,
    user: "Amina Yusuf",
    action: "uploaded a new file",
    resource: "Employee Payroll June.xlsx",
    time: "24 minutes ago",
    status: "Encrypted",
  },
  {
    id: 3,
    user: "Mohamed Ali",
    action: "created a secure link",
    resource: "Supplier Agreement.pdf",
    time: "1 hour ago",
    status: "Active",
  },
  {
    id: 4,
    user: "Security System",
    action: "blocked an access attempt",
    resource: "Board Meeting Minutes.docx",
    time: "2 hours ago",
    status: "Critical",
  },
];

const alerts = [
  {
    id: 1,
    title: "New login from unknown device",
    detail: "Ahmed Hassan · Mogadishu",
    severity: "Warning",
  },
  {
    id: 2,
    title: "Restricted file access blocked",
    detail: "External user · Finance Department",
    severity: "Critical",
  },
];

const approvals = [
  {
    id: "APR-2481",
    file: "Q2 Financial Report.pdf",
    requester: "Amina Yusuf",
    status: "Confidential",
  },
  {
    id: "APR-2482",
    file: "Supplier Agreement.pdf",
    requester: "Abdi Rahman",
    status: "Highly Confidential",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const riskScore = 12;
  const riskDegrees = riskScore * 3.6;

  return (
    <section className="p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-heading md:text-3xl">
                Welcome back, {user?.fullName?.split(" ")[0]}
              </h1>

              <StatusBadge status="healthy">
                System Healthy
              </StatusBadge>
            </div>

            <p className="mt-1 text-sm text-muted">
              Monitor encrypted files, approvals, sharing, and
              security activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/app/folders")}
            >
              <FolderPlus size={17} />

              Create Folder
            </Button>

            <Button
              onClick={() => navigate("/app/files/upload")}
            >
              <Upload size={17} />

              Upload File
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="rounded-card border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>

                  {card.trend && (
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        card.trend === "up"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {card.trend === "up" ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}

                      {card.note}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted">
                  {card.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-heading">
                  {card.value}
                </p>

                {!card.trend && (
                  <p className="mt-2 text-xs text-muted">
                    {card.note}
                  </p>
                )}

                {card.label === "Storage Used" && (
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[45%] rounded-full bg-primary" />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_0.8fr]">
          <article className="rounded-card border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-heading">
                  Upload and Download Activity
                </h2>

                <p className="mt-1 text-xs text-muted">
                  File activity during the last seven days
                </p>
              </div>

              <select className="rounded-lg border border-border bg-white px-3 py-2 text-xs text-body outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 border-b border-l border-slate-200 px-4 pb-0">
              {activityData.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="flex h-full flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-blue-300 transition hover:opacity-80"
                    style={{
                      height: `${value}%`,
                    }}
                    title={`${value} activities`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 text-center text-[10px] font-semibold uppercase text-muted">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <span key={day}>{day}</span>
                )
              )}
            </div>
          </article>

          <article className="rounded-card border border-border bg-white p-5 shadow-sm">
            <div>
              <h2 className="font-semibold text-heading">
                Security Risk Score
              </h2>

              <p className="mt-1 text-xs text-muted">
                Organization security health
              </p>
            </div>

            <div className="mt-7 flex justify-center">
              <div
                className="flex h-44 w-44 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#16a34a ${riskDegrees}deg, #dbeafe ${riskDegrees}deg)`,
                }}
              >
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
                  <ShieldCheck
                    size={25}
                    className="text-security"
                  />

                  <strong className="mt-2 text-3xl text-heading">
                    {riskScore}
                  </strong>

                  <span className="text-xs font-bold uppercase text-security">
                    Low Risk
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              <CheckCircle2 size={19} />

              System integrity is optimal
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-3">
          <article className="rounded-card border border-border bg-white p-5 shadow-sm xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-heading">
                Security Alerts
              </h2>

              <button
                type="button"
                onClick={() =>
                  navigate("/app/security/monitoring")
                }
                className="text-xs font-semibold text-primary hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-3 rounded-lg border border-border p-3"
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      alert.severity === "Critical"
                        ? "bg-red-50 text-danger"
                        : "bg-orange-50 text-accent"
                    }`}
                  >
                    <AlertTriangle size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-heading">
                      {alert.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted">
                      {alert.detail}
                    </p>

                    <div className="mt-2">
                      <StatusBadge status={alert.severity}>
                        {alert.severity}
                      </StatusBadge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-card border border-border bg-white p-5 shadow-sm xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-heading">
                Pending Approvals
              </h2>

              <button
                type="button"
                onClick={() => navigate("/app/approvals")}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Review all
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {approvals.map((approval) => (
                <div
                  key={approval.id}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <FileCheck2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-heading">
                        {approval.file}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Requested by {approval.requester}
                      </p>

                      <div className="mt-2">
                        <StatusBadge status={approval.status}>
                          {approval.status}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() =>
                      navigate(
                        `/app/approvals/${approval.id}`
                      )
                    }
                  >
                    Review Request
                  </Button>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-card border border-border bg-white p-5 shadow-sm xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-heading">
                Recent Activity
              </h2>

              <Activity size={18} className="text-muted" />
            </div>

            <div className="mt-4 space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-heading">
                    {activity.user.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-5 text-body">
                      <span className="font-semibold text-heading">
                        {activity.user}
                      </span>{" "}
                      {activity.action}
                    </p>

                    <p className="truncate text-xs font-medium text-primary">
                      {activity.resource}
                    </p>

                    <p className="mt-1 text-[10px] text-muted">
                      {activity.time}
                    </p>
                  </div>

                  <div>
                    <StatusBadge status={activity.status}>
                      {activity.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}