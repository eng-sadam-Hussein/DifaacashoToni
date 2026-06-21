import { useMemo, useState } from "react";

import {
  Download,
  Eye,
  File,
  Folder,
  Grid2X2,
  Heart,
  List,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import StatusBadge from "../../components/common/StatusBadge";
import { files as initialFiles } from "../../data/appData";

const pageMeta = {
  mine: {
    eyebrow: "File Workspace",
    title: "My Files",
    description:
      "Browse, organize and manage your encrypted corporate files.",
    accent: "blue",
  },
  sharedWithMe: {
    eyebrow: "Incoming Shares",
    title: "Shared With Me",
    description:
      "Files securely shared with your corporate account.",
    accent: "green",
  },
  sharedByMe: {
    eyebrow: "Outgoing Shares",
    title: "Shared By Me",
    description:
      "Monitor files, recipients and links you have shared.",
    accent: "orange",
  },
  recent: {
    eyebrow: "Recent Activity",
    title: "Recent Files",
    description:
      "Continue working with recently accessed documents.",
    accent: "blue",
  },
  favorites: {
    eyebrow: "Saved Resources",
    title: "Favorite Files",
    description:
      "Quick access to files marked as important.",
    accent: "orange",
  },
  trash: {
    eyebrow: "Recovery Center",
    title: "Trash",
    description:
      "Restore deleted files or permanently remove them.",
    accent: "orange",
  },
  folders: {
    eyebrow: "Organization",
    title: "Folders",
    description:
      "Organize corporate content into secure folders.",
    accent: "green",
  },
};

export default function FilesWorkspacePage({
  mode = "mine",
}) {
  const navigate = useNavigate();
  const params = useParams();

  const [records, setRecords] = useState(initialFiles);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [classification, setClassification] =
    useState("all");

  const meta = pageMeta[mode] || pageMeta.mine;

  const filteredFiles = useMemo(() => {
    let result = [...records];

    if (mode === "sharedWithMe") {
      result = result.filter(
        (file) => file.sharedWithMe
      );
    }

    if (mode === "sharedByMe") {
      result = result.filter(
        (file) => file.sharedByMe
      );
    }

    if (mode === "favorites") {
      result = result.filter(
        (file) => file.favorite
      );
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((file) =>
        Object.values(file).some((value) =>
          String(value)
            .toLowerCase()
            .includes(keyword)
        )
      );
    }

    if (classification !== "all") {
      result = result.filter(
        (file) =>
          file.classification === classification
      );
    }

    return result;
  }, [records, mode, search, classification]);

  const selectedFile = params.fileId
    ? records.find(
        (file) => file.id === params.fileId
      )
    : null;

  const toggleFavorite = (id) => {
    setRecords((current) =>
      current.map((file) =>
        file.id === id
          ? {
              ...file,
              favorite: !file.favorite,
            }
          : file
      )
    );
  };

  const deleteFile = (id) => {
    setRecords((current) =>
      current.filter((file) => file.id !== id)
    );

    toast.success("File moved to trash.");
  };

  if (mode === "folders") {
    const folders = [
      ...new Set(records.map((file) => file.folder)),
    ];

    return (
      <section className="page-container">
        <PageHeader
          {...meta}
          actions={
            <button
              type="button"
              className="green-button"
              onClick={() =>
                toast.success(
                  "Create folder form opened."
                )
              }
            >
              <Folder size={17} />
              Create Folder
            </button>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {folders.map((folder, index) => {
            const folderFiles = records.filter(
              (file) => file.folder === folder
            );

            const accentColors = [
              "bg-blue-500/10 text-brand-blue",
              "bg-green-500/10 text-brand-green",
              "bg-orange-500/10 text-brand-orange",
            ];

            return (
              <button
                key={folder}
                type="button"
                onClick={() =>
                  navigate(
                    `/app/folders/${encodeURIComponent(
                      folder
                    )}`
                  )
                }
                className="app-card p-5 text-left transition hover:-translate-y-1 hover:shadow-panel"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accentColors[
                      index % accentColors.length
                    ]
                  }`}
                >
                  <Folder size={23} />
                </div>

                <h2 className="mt-5 font-bold text-fg">
                  {folder}
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {folderFiles.length} encrypted files
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                  <span>
                    {folderFiles.reduce(
                      (total) => total + 1,
                      0
                    )}{" "}
                    items
                  </span>

                  <MoreHorizontal size={17} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="page-container">
      <PageHeader
        {...meta}
        actions={
          <>
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate("/app/share/new")
              }
            >
              <Share2 size={17} />
              Secure Share
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                navigate("/app/files/upload")
              }
            >
              <Upload size={17} />
              Upload File
            </button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)]">
        <Panel
          title="File Locations"
          description="Browse protected resources"
          className="h-fit"
        >
          <div className="space-y-1 p-3">
            {[
              "All Files",
              "Finance",
              "Human Resources",
              "Procurement",
              "Administration",
            ].map((location, index) => (
              <button
                key={location}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                  index === 0
                    ? "bg-blue-500/10 font-semibold text-brand-blue"
                    : "text-muted hover:bg-elevated hover:text-fg"
                }`}
              >
                {index === 0 ? (
                  <File size={17} />
                ) : (
                  <Folder size={17} />
                )}

                {location}
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex flex-col gap-3 border-b border-line p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search files..."
                className="app-input pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={classification}
                onChange={(event) =>
                  setClassification(
                    event.target.value
                  )
                }
                className="app-select"
              >
                <option value="all">
                  All classifications
                </option>
                <option>Internal</option>
                <option>Confidential</option>
                <option>Highly Confidential</option>
                <option>Restricted</option>
              </select>

              <div className="flex rounded-xl border border-line bg-elevated p-1">
                <button
                  type="button"
                  onClick={() => setView("table")}
                  className={`rounded-lg p-2 ${
                    view === "table"
                      ? "bg-surface text-brand-blue shadow-sm"
                      : "text-muted"
                  }`}
                >
                  <List size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 ${
                    view === "grid"
                      ? "bg-surface text-brand-blue shadow-sm"
                      : "text-muted"
                  }`}
                >
                  <Grid2X2 size={17} />
                </button>
              </div>
            </div>
          </div>

          {view === "table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-elevated">
                  <tr>
                    {[
                      "File",
                      "Owner",
                      "Classification",
                      "Size",
                      "Status",
                      "Modified",
                      "",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-line">
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      className="hover:bg-elevated"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/app/files/${file.id}`
                            )
                          }
                          className="flex items-center gap-3 text-left"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-brand-blue">
                            <File size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-fg">
                              {file.name}
                            </p>

                            <p className="text-xs text-muted">
                              {file.department}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                        {file.owner}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <StatusBadge
                          status={
                            file.classification ===
                            "Restricted"
                              ? "restricted"
                              : file.classification
                          }
                        >
                          {file.classification}
                        </StatusBadge>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                        {file.size}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <StatusBadge
                          status={file.status}
                        >
                          {file.status}
                        </StatusBadge>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
                        {file.modified}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              toggleFavorite(file.id)
                            }
                            className={`rounded-lg p-2 ${
                              file.favorite
                                ? "bg-orange-500/10 text-brand-orange"
                                : "text-muted hover:bg-elevated"
                            }`}
                          >
                            <Heart size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/app/files/${file.id}`
                              )
                            }
                            className="rounded-lg p-2 text-muted hover:bg-blue-500/10 hover:text-brand-blue"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toast.success(
                                "Download started."
                              )
                            }
                            className="rounded-lg p-2 text-muted hover:bg-green-500/10 hover:text-brand-green"
                          >
                            <Download size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteFile(file.id)
                            }
                            className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-600"
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
          ) : (
            <div className="grid gap-4 p-5 sm:grid-cols-2 2xl:grid-cols-3">
              {filteredFiles.map((file) => (
                <article
                  key={file.id}
                  className="rounded-2xl border border-line bg-elevated p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-brand-blue">
                      <File size={23} />
                    </div>

                    <button
                      type="button"
                      className="rounded-lg p-2 text-muted hover:bg-surface"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <h3 className="mt-4 truncate font-bold text-fg">
                    {file.name}
                  </h3>

                  <p className="mt-1 text-xs text-muted">
                    {file.owner} · {file.size}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <StatusBadge status={file.status}>
                      {file.status}
                    </StatusBadge>

                    <StatusBadge
                      status={file.classification}
                    >
                      {file.classification}
                    </StatusBadge>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Panel>
      </div>

      {selectedFile && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/45">
          <button
            type="button"
            onClick={() => navigate("/app/files")}
            className="absolute inset-0"
            aria-label="Close file details"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto border-l border-line bg-surface p-6 shadow-panel">
            <button
              type="button"
              onClick={() => navigate("/app/files")}
              className="text-sm font-semibold text-brand-blue"
            >
              ← Back to files
            </button>

            <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-brand-blue">
              <File size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-fg">
              {selectedFile.name}
            </h2>

            <p className="mt-2 text-sm text-muted">
              File ID: {selectedFile.id}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              {[
                ["Owner", selectedFile.owner],
                ["Department", selectedFile.department],
                [
                  "Classification",
                  selectedFile.classification,
                ],
                ["Size", selectedFile.size],
                ["Status", selectedFile.status],
                ["Modified", selectedFile.modified],
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

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="primary-button flex-1"
                onClick={() =>
                  navigate("/app/share/new")
                }
              >
                <Share2 size={17} />
                Secure Share
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  navigate(
                    `/app/files/${selectedFile.id}/versions`
                  )
                }
              >
                Versions
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}