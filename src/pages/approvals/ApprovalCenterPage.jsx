import { useState } from "react";

import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import StatusBadge from "../../components/common/StatusBadge";
import { approvals as initialApprovals } from "../../data/appData";

export default function ApprovalCenterPage() {
  const [approvals, setApprovals] =
    useState(initialApprovals);

  const [selectedId, setSelectedId] = useState(
    initialApprovals[0]?.id
  );

  const selected = approvals.find(
    (approval) => approval.id === selectedId
  );

  const updateStatus = (status) => {
    setApprovals((current) =>
      current.map((approval) =>
        approval.id === selectedId
          ? {
              ...approval,
              status,
            }
          : approval
      )
    );

    toast.success(`Request ${status.toLowerCase()}.`);
  };

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Approval Workflow"
        title="Approval Center"
        description="Review sharing requests, security risks and approval history."
        accent="green"
      />

      <div className="grid gap-5 xl:grid-cols-[390px_minmax(0,1fr)]">
        <Panel
          title="Approval Queue"
          description={`${approvals.length} requests`}
        >
          <div className="divide-y divide-line">
            {approvals.map((approval) => (
              <button
                key={approval.id}
                type="button"
                onClick={() =>
                  setSelectedId(approval.id)
                }
                className={`w-full p-4 text-left transition ${
                  selectedId === approval.id
                    ? "bg-green-500/10"
                    : "hover:bg-elevated"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-brand-green">
                    <FileCheck2 size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-fg">
                      {approval.file}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {approval.requester} ·{" "}
                      {approval.submitted}
                    </p>

                    <div className="mt-2 flex gap-2">
                      <StatusBadge
                        status={approval.status}
                      >
                        {approval.status}
                      </StatusBadge>

                      <StatusBadge
                        status={
                          approval.risk === "High"
                            ? "critical"
                            : "warning"
                        }
                      >
                        {approval.risk} Risk
                      </StatusBadge>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        {selected && (
          <Panel>
            <div className="p-6">
              <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Request {selected.id}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-fg">
                    {selected.file}
                  </h2>

                  <p className="mt-1 text-sm text-muted">
                    Requested by {selected.requester}
                  </p>
                </div>

                <StatusBadge status={selected.status}>
                  {selected.status}
                </StatusBadge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Stage", selected.stage],
                  ["Destination", selected.destination],
                  ["Risk Level", selected.risk],
                  ["Submitted", selected.submitted],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-elevated p-4"
                  >
                    <p className="text-xs font-bold uppercase text-muted">
                      {label}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-fg">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/10 p-5">
                <div className="flex items-center gap-3 text-brand-orange">
                  <ShieldAlert size={21} />

                  <h3 className="font-bold">
                    Automated Risk Assessment
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted">
                  The request includes a confidential file and
                  an external destination. Email OTP, expiration,
                  download limit and audit logging are recommended.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-fg">
                  Approval Timeline
                </h3>

                <div className="mt-4 space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Request submitted",
                      time: selected.submitted,
                      color: "text-brand-green",
                    },
                    {
                      icon: Clock3,
                      title: selected.stage,
                      time: "Waiting for review",
                      color: "text-brand-orange",
                    },
                  ].map((event) => {
                    const Icon = event.icon;

                    return (
                      <div
                        key={event.title}
                        className="flex gap-4"
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-elevated ${event.color}`}
                        >
                          <Icon size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-fg">
                            {event.title}
                          </p>

                          <p className="text-xs text-muted">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    updateStatus("Approved")
                  }
                  className="green-button flex-1"
                >
                  <CheckCircle2 size={18} />
                  Approve Request
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus("Rejected")
                  }
                  className="secondary-button flex-1 text-red-600"
                >
                  <XCircle size={18} />
                  Reject Request
                </button>
              </div>
            </div>
          </Panel>
        )}
      </div>
    </section>
  );
}