import {
  Building2,
  HardDrive,
  Plus,
  ShieldCheck,
  Tags,
  UserCog,
  Users,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import StatusBadge from "../../components/common/StatusBadge";
import {
  departments,
  users,
} from "../../data/appData";

export default function AdminCenterPage({
  mode = "users",
}) {
  if (mode === "departments") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Organization Structure"
          title="Departments"
          description="Manage department managers, members, files and storage."
          accent="green"
          actions={
            <button
              type="button"
              className="green-button"
            >
              <Plus size={17} />
              Add Department
            </button>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <article
              key={department.id}
              className="app-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-brand-green">
                  <Building2 size={22} />
                </div>

                <StatusBadge status="active">
                  Active
                </StatusBadge>
              </div>

              <h2 className="mt-5 text-lg font-bold text-fg">
                {department.name}
              </h2>

              <p className="mt-1 text-sm text-muted">
                Manager: {department.manager}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ["Members", department.members],
                  ["Files", department.files],
                  ["Storage", department.storage],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-elevated p-3 text-center"
                  >
                    <p className="text-sm font-bold text-fg">
                      {value}
                    </p>

                    <p className="mt-1 text-[10px] uppercase text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (mode === "roles") {
    const permissions = [
      "View",
      "Create",
      "Update",
      "Delete",
      "Share",
      "Approve",
    ];

    const roles = [
      "Super Admin",
      "Organization Admin",
      "Security Officer",
      "Department Manager",
      "Employee",
    ];

    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Access Control"
          title="Roles & Permissions"
          description="Configure role capabilities and system access boundaries."
          accent="orange"
          actions={
            <button
              type="button"
              className="orange-button"
            >
              <UserCog size={17} />
              Create Role
            </button>
          }
        />

        <Panel>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-elevated">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase text-muted">
                    Role
                  </th>

                  {permissions.map((permission) => (
                    <th
                      key={permission}
                      className="px-5 py-4 text-center text-xs font-bold uppercase text-muted"
                    >
                      {permission}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {roles.map((role, roleIndex) => (
                  <tr key={role}>
                    <td className="px-5 py-4 font-semibold text-fg">
                      {role}
                    </td>

                    {permissions.map(
                      (permission, permissionIndex) => {
                        const enabled =
                          roleIndex === 0 ||
                          permissionIndex <
                            5 - roleIndex;

                        return (
                          <td
                            key={permission}
                            className="px-5 py-4 text-center"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={enabled}
                              className="h-4 w-4 accent-orange-500"
                            />
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    );
  }

  if (mode === "categories") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Content Organization"
          title="Categories & Tags"
          description="Create reusable categories and tags for corporate files."
          accent="orange"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel
            title="Categories"
            description="High-level content grouping"
          >
            <div className="space-y-3 p-5">
              {[
                "Financial Records",
                "Human Resources",
                "Legal Documents",
                "Security Records",
              ].map((category, index) => (
                <div
                  key={category}
                  className="flex items-center justify-between rounded-xl bg-elevated p-4"
                >
                  <div className="flex items-center gap-3">
                    <Tags
                      size={18}
                      className={
                        index % 2 === 0
                          ? "text-brand-orange"
                          : "text-brand-blue"
                      }
                    />

                    <p className="font-semibold text-fg">
                      {category}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-sm font-semibold text-brand-blue"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Popular Tags"
            description="Reusable file labels"
          >
            <div className="flex flex-wrap gap-3 p-5">
              {[
                "finance",
                "payroll",
                "quarterly",
                "contract",
                "board",
                "confidential",
                "audit",
                "policy",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="rounded-full border border-line bg-elevated px-4 py-2 text-sm font-medium text-fg hover:border-brand-orange hover:text-brand-orange"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    );
  }

  if (mode === "storage") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Infrastructure"
          title="Storage Management"
          description="Monitor storage quotas, department usage and capacity."
          accent="blue"
        />

        <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          <article className="app-card p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted">
                  Organization Storage
                </p>

                <p className="mt-2 text-3xl font-bold text-fg">
                  450 GB
                </p>

                <p className="mt-1 text-sm text-muted">
                  of 1 TB used
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-brand-blue">
                <HardDrive size={26} />
              </div>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-elevated">
              <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange" />
            </div>
          </article>

          <article className="app-card p-6">
            <ShieldCheck className="text-brand-green" />

            <h2 className="mt-4 font-bold text-fg">
              Storage Protection
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              All stored files are encrypted and included in
              integrity verification.
            </p>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="User Administration"
        title="Users Management"
        description="Manage accounts, roles, MFA status and department assignments."
        accent="blue"
        actions={
          <button
            type="button"
            onClick={() =>
              toast.success("Add user form opened.")
            }
            className="primary-button"
          >
            <Plus size={17} />
            Add User
          </button>
        }
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-elevated">
              <tr>
                {[
                  "User",
                  "Role",
                  "Department",
                  "MFA",
                  "Status",
                  "Action",
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-elevated"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 font-bold text-brand-blue">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-fg">
                          {user.name}
                        </p>

                        <p className="text-xs text-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {user.role}
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {user.department}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        user.mfa === "Enabled"
                          ? "active"
                          : "pending"
                      }
                    >
                      {user.mfa}
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status="active">
                      {user.status}
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="text-sm font-semibold text-brand-blue"
                    >
                      Manage
                    </button>
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