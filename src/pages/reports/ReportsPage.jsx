import {
  BarChart3,
  Download,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";

const chartData = [
  35, 52, 44, 68, 73, 61, 89, 77, 92, 84, 96, 88,
];

export default function ReportsPage() {
  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Analytics"
        title="Reports & Insights"
        description="Analyze file activity, security posture, storage and collaboration."
        accent="blue"
        actions={
          <button
            type="button"
            onClick={() =>
              toast.success("Report exported.")
            }
            className="primary-button"
          >
            <Download size={17} />
            Export Report
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "File Activity",
            value: "4,820",
            icon: FileText,
            color:
              "bg-blue-500/10 text-brand-blue",
          },
          {
            label: "Secure Shares",
            value: "284",
            icon: Users,
            color:
              "bg-green-500/10 text-brand-green",
          },
          {
            label: "Security Events",
            value: "76",
            icon: ShieldCheck,
            color:
              "bg-orange-500/10 text-brand-orange",
          },
          {
            label: "Compliance Score",
            value: "92%",
            icon: BarChart3,
            color:
              "bg-purple-500/10 text-purple-600",
          },
        ].map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.label}
              className="app-card p-5"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.color}`}
              >
                <Icon size={21} />
              </div>

              <p className="mt-4 text-sm text-muted">
                {metric.label}
              </p>

              <p className="mt-1 text-2xl font-bold text-fg">
                {metric.value}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <Panel
          title="Monthly File Activity"
          description="Uploads, downloads and secure shares"
        >
          <div className="flex h-80 items-end gap-3 p-6">
            {chartData.map((value, index) => (
              <div
                key={`${value}-${index}`}
                className="flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-brand-blue via-brand-green to-brand-orange transition hover:opacity-80"
                  style={{
                    height: `${value}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Report Categories"
          description="Available analytics"
        >
          <div className="space-y-3 p-5">
            {[
              "File Activity Report",
              "Secure Sharing Report",
              "Security Incident Report",
              "User Activity Report",
              "Storage Utilization Report",
              "Compliance Report",
            ].map((report, index) => (
              <button
                key={report}
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-elevated p-4 text-left hover:ring-1 hover:ring-brand-blue"
              >
                <span className="text-sm font-semibold text-fg">
                  {report}
                </span>

                <span
                  className={
                    index % 3 === 0
                      ? "text-brand-blue"
                      : index % 3 === 1
                        ? "text-brand-green"
                        : "text-brand-orange"
                  }
                >
                  →
                </span>
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}