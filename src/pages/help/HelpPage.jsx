import {
  BookOpen,
  FileQuestion,
  LifeBuoy,
  LockKeyhole,
  Mail,
  Search,
  Share2,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

const categories = [
  {
    title: "File Management",
    description:
      "Upload, organize and manage encrypted files.",
    icon: BookOpen,
    color: "bg-blue-500/10 text-brand-blue",
  },
  {
    title: "Secure Sharing",
    description:
      "Configure permissions and protected links.",
    icon: Share2,
    color: "bg-orange-500/10 text-brand-orange",
  },
  {
    title: "Account Security",
    description:
      "Password, MFA and session management.",
    icon: LockKeyhole,
    color: "bg-green-500/10 text-brand-green",
  },
  {
    title: "Troubleshooting",
    description:
      "Resolve common system and access issues.",
    icon: FileQuestion,
    color: "bg-purple-500/10 text-purple-600",
  },
];

export default function HelpPage() {
  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Support Center"
        title="How can we help?"
        description="Search documentation, product guidance and security support resources."
        accent="blue"
      />

      <div className="rounded-3xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-green p-6 text-white shadow-panel md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <LifeBuoy
            size={38}
            className="mx-auto"
          />

          <h2 className="mt-4 text-2xl font-bold">
            Search AFESS documentation
          </h2>

          <div className="relative mt-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search files, sharing, approvals or security..."
              className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-sm text-slate-900 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.title}
              type="button"
              className="app-card p-5 text-left transition hover:-translate-y-1 hover:shadow-panel"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}
              >
                <Icon size={22} />
              </div>

              <h2 className="mt-5 font-bold text-fg">
                {category.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="app-card p-6">
          <Mail className="text-brand-blue" />

          <h2 className="mt-4 font-bold text-fg">
            Contact Support
          </h2>

          <p className="mt-2 text-sm text-muted">
            Send a support request to the AFESS technical
            support team.
          </p>

          <button
            type="button"
            className="primary-button mt-5"
          >
            Open Support Request
          </button>
        </article>

        <article className="app-card p-6">
          <LockKeyhole className="text-brand-orange" />

          <h2 className="mt-4 font-bold text-fg">
            Report Security Issue
          </h2>

          <p className="mt-2 text-sm text-muted">
            Report suspicious access, data exposure or account
            security concerns.
          </p>

          <button
            type="button"
            className="orange-button mt-5"
          >
            Report Security Issue
          </button>
        </article>
      </div>
    </section>
  );
}