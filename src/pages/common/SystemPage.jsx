import {
  Download,
  Edit3,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

const statusColors = {
  active:
    "bg-green-50 text-green-700 ring-green-600/20",
  encrypted:
    "bg-green-50 text-green-700 ring-green-600/20",
  approved:
    "bg-green-50 text-green-700 ring-green-600/20",
  pending:
    "bg-amber-50 text-amber-700 ring-amber-600/20",
  warning:
    "bg-orange-50 text-orange-700 ring-orange-600/20",
  blocked:
    "bg-red-50 text-red-700 ring-red-600/20",
  critical:
    "bg-red-50 text-red-700 ring-red-600/20",
  restricted:
    "bg-red-50 text-red-700 ring-red-600/20",
  shared:
    "bg-blue-50 text-blue-700 ring-blue-600/20",
  default:
    "bg-slate-100 text-slate-700 ring-slate-600/20",
};

export default function SystemPage({
  title,
  description,
  primaryAction = "Add New",
  columns = [],
  initialRows = [],
  statistics = [],
  storageKey,
}) {
  const localStorageKey =
    storageKey ||
    `afess_page_${title
      .toLowerCase()
      .replaceAll(" ", "_")}`;

  const [rows, setRows] = useState(() => {
    try {
      const storedRows =
        localStorage.getItem(localStorageKey);

      return storedRows
        ? JSON.parse(storedRows)
        : initialRows;
    } catch {
      return initialRows;
    }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [newRecord, setNewRecord] = useState({
    name: "",
    owner: "",
    status: "Active",
  });

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(rows)
    );
  }, [rows, localStorageKey]);

  const filteredRows = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !keyword ||
        Object.values(row).some((value) =>
          String(value)
            .toLowerCase()
            .includes(keyword)
        );

      const matchesStatus =
        statusFilter === "all" ||
        String(row.status)
          .toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const statusOptions = useMemo(() => {
    return [
      ...new Set(
        rows
          .map((row) => row.status)
          .filter(Boolean)
      ),
    ];
  }, [rows]);

  const handleCreate = (event) => {
    event.preventDefault();

    if (!newRecord.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    const record = {
      id: `REC-${Date.now()}`,
      ...newRecord,
      updatedAt: new Date().toLocaleDateString(),
    };

    setRows((currentRows) => [
      record,
      ...currentRows,
    ]);

    setNewRecord({
      name: "",
      owner: "",
      status: "Active",
    });

    setShowCreateModal(false);

    toast.success(
      `${primaryAction} completed successfully.`
    );
  };

  const handleDelete = (id) => {
    setRows((currentRows) =>
      currentRows.filter(
        (row) => row.id !== id
      )
    );

    toast.success("Record removed.");
  };

  const handleExport = () => {
    const csvHeader = columns
      .map((column) => column.label)
      .join(",");

    const csvRows = filteredRows.map((row) =>
      columns
        .map((column) =>
          JSON.stringify(
            row[column.key] ?? ""
          )
        )
        .join(",")
    );

    const blob = new Blob(
      [[csvHeader, ...csvRows].join("\n")],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${title
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    anchor.click();
    URL.revokeObjectURL(url);

    toast.success("Data exported.");
  };

  return (
    <section className="mx-auto w-full max-w-[1600px]">
      <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download size={17} />
            Export
          </button>

          <button
            type="button"
            onClick={() =>
              setShowCreateModal(true)
            }
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            {primaryAction}
          </button>
        </div>
      </header>

      {statistics.length > 0 && (
        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {statistic.label}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                {statistic.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {statistic.note}
              </p>
            </article>
          ))}
        </div>
      )}

      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-600"
            >
              <option value="all">
                All statuses
              </option>

              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            <span className="whitespace-nowrap text-xs font-medium text-slate-500">
              {filteredRows.length} records
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {column.label}
                  </th>
                ))}

                <th className="px-5 py-3 text-right text-xs font-bold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-5 py-4 text-sm text-slate-600"
                    >
                      {column.key === "status" ? (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            statusColors[
                              String(
                                row.status
                              ).toLowerCase()
                            ] ||
                            statusColors.default
                          }`}
                        >
                          {row.status}
                        </span>
                      ) : (
                        row[column.key] ?? "—"
                      )}
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          toast.success(
                            "Details opened."
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toast.success(
                            "Edit form opened."
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Edit3 size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(row.id)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredRows.map((row) => (
            <article
              key={row.id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {row.name ||
                      row.file ||
                      row.event ||
                      row.id}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {row.owner ||
                      row.requester ||
                      row.user ||
                      "AFESS SecureShare"}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {row.status && (
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {row.status}
                  </span>
                )}

                {row.department && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    {row.department}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredRows.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-semibold text-slate-800">
              No records found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Change your search or filter.
            </p>
          </div>
        )}
      </article>

      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-950">
                  {primaryAction}
                </h2>

                <p className="text-xs text-slate-500">
                  Enter the record information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </header>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Name
                </label>

                <input
                  value={newRecord.name}
                  onChange={(event) =>
                    setNewRecord(
                      (current) => ({
                        ...current,
                        name: event.target.value,
                      })
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Owner or description
                </label>

                <input
                  value={newRecord.owner}
                  onChange={(event) =>
                    setNewRecord(
                      (current) => ({
                        ...current,
                        owner:
                          event.target.value,
                      })
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter information"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Status
                </label>

                <select
                  value={newRecord.status}
                  onChange={(event) =>
                    setNewRecord(
                      (current) => ({
                        ...current,
                        status:
                          event.target.value,
                      })
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-600"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Encrypted</option>
                  <option>Restricted</option>
                </select>
              </div>
            </div>

            <footer className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Record
              </button>
            </footer>
          </form>
        </div>
      )}
    </section>
  );
}