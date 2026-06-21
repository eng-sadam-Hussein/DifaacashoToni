import { useRef, useState } from "react";

import {
  CheckCircle2,
  FileLock2,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";

export default function UploadCenterPage() {
  const inputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] =
    useState([]);

  const [form, setForm] = useState({
    department: "Finance",
    classification: "Internal",
    folder: "General Documents",
    tags: "",
    requireApproval: false,
  });

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(
      (file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: `${(
          file.size /
          1024 /
          1024
        ).toFixed(2)} MB`,
        progress: 0,
        status: "Ready",
      })
    );

    setSelectedFiles((current) => [
      ...current,
      ...newFiles,
    ]);
  };

  const startUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Select at least one file.");
      return;
    }

    setSelectedFiles((current) =>
      current.map((item) => ({
        ...item,
        progress: 100,
        status: "Encrypted",
      }))
    );

    toast.success(
      "Files validated, classified and encrypted."
    );
  };

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Secure Ingestion"
        title="Upload Center"
        description="Upload, classify, scan and encrypt files before they enter corporate storage."
        accent="green"
      />

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <Panel
          title="Upload Files"
          description="Drag files here or browse your device"
        >
          <div className="p-5">
            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={(event) => {
                event.preventDefault();
                addFiles(event.dataTransfer.files);
              }}
              className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 p-8 text-center transition hover:border-brand-blue hover:bg-blue-500/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg">
                <UploadCloud size={30} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-fg">
                Drop files to upload
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Documents will be scanned, classified and
                protected before storage.
              </p>

              <span className="primary-button mt-5">
                Browse Files
              </span>
            </button>

            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(event) =>
                addFiles(event.target.files)
              }
            />

            <div className="mt-5 space-y-3">
              {selectedFiles.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-line bg-elevated p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-brand-green">
                    <FileLock2 size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-fg">
                      {item.name}
                    </p>

                    <p className="text-xs text-muted">
                      {item.size} · {item.status}
                    </p>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-brand-green transition-all"
                        style={{
                          width: `${item.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedFiles((current) =>
                        current.filter(
                          (file) =>
                            file.id !== item.id
                        )
                      )
                    }
                    className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-600"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Security Configuration"
          description="Define protection before upload"
        >
          <div className="space-y-5 p-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Department
              </label>

              <select
                className="app-input"
                value={form.department}
                onChange={(event) =>
                  setForm({
                    ...form,
                    department: event.target.value,
                  })
                }
              >
                <option>Finance</option>
                <option>Human Resources</option>
                <option>Information Security</option>
                <option>Administration</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Classification
              </label>

              <select
                className="app-input"
                value={form.classification}
                onChange={(event) =>
                  setForm({
                    ...form,
                    classification:
                      event.target.value,
                  })
                }
              >
                <option>Public</option>
                <option>Internal</option>
                <option>Confidential</option>
                <option>Highly Confidential</option>
                <option>Restricted</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Destination Folder
              </label>

              <input
                className="app-input"
                value={form.folder}
                onChange={(event) =>
                  setForm({
                    ...form,
                    folder: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Tags
              </label>

              <input
                className="app-input"
                placeholder="finance, quarter-2"
                value={form.tags}
                onChange={(event) =>
                  setForm({
                    ...form,
                    tags: event.target.value,
                  })
                }
              />
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-line bg-elevated p-4">
              <input
                type="checkbox"
                checked={form.requireApproval}
                onChange={(event) =>
                  setForm({
                    ...form,
                    requireApproval:
                      event.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 accent-blue-600"
              />

              <span>
                <span className="block text-sm font-semibold text-fg">
                  Require approval before sharing
                </span>

                <span className="mt-1 block text-xs text-muted">
                  Route sharing requests to manager and
                  security officer.
                </span>
              </span>
            </label>

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <div className="flex items-center gap-2 text-brand-green">
                <ShieldCheck size={18} />

                <p className="text-sm font-bold">
                  AES-256-GCM protection
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted">
                Files will be encrypted before storage and
                integrity hashes will be generated.
              </p>
            </div>

            <button
              type="button"
              onClick={startUpload}
              className="green-button w-full"
            >
              <CheckCircle2 size={18} />
              Encrypt and Upload
            </button>
          </div>
        </Panel>
      </div>
    </section>
  );
}