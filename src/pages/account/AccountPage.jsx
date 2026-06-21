import { useState } from "react";

import {
  Bell,
  Camera,
  CheckCircle2,
  Mail,
  Save,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import useAuthStore from "../../store/authStore";
import {
  notifications as initialNotifications,
} from "../../data/appData";

export default function AccountPage({
  mode = "profile",
}) {
  const user = useAuthStore((state) => state.user);

  const updateCurrentUser = useAuthStore(
    (state) => state.updateCurrentUser
  );

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    department: user?.department || "",
  });

  const [notifications, setNotifications] =
    useState(initialNotifications);

  if (mode === "notifications") {
    return (
      <section className="page-container">
        <PageHeader
          eyebrow="Activity Inbox"
          title="Notifications"
          description="Review approval, sharing, encryption and account notifications."
          accent="orange"
          actions={
            <button
              type="button"
              onClick={() =>
                setNotifications((current) =>
                  current.map((notification) => ({
                    ...notification,
                    read: true,
                  }))
                )
              }
              className="secondary-button"
            >
              <CheckCircle2 size={17} />
              Mark All Read
            </button>
          }
        />

        <Panel>
          <div className="divide-y divide-line">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  setNotifications((current) =>
                    current.map((item) =>
                      item.id === notification.id
                        ? {
                            ...item,
                            read: true,
                          }
                        : item
                    )
                  )
                }
                className={`flex w-full gap-4 p-5 text-left hover:bg-elevated ${
                  !notification.read
                    ? "bg-orange-500/5"
                    : ""
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    notification.type === "security"
                      ? "bg-green-500/10 text-brand-green"
                      : notification.type === "approval"
                        ? "bg-orange-500/10 text-brand-orange"
                        : "bg-blue-500/10 text-brand-blue"
                  }`}
                >
                  <Bell size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-fg">
                      {notification.title}
                    </h2>

                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-brand-orange" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-muted">
                    {notification.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Panel>
      </section>
    );
  }

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="Account Management"
        title="My Profile"
        description="Manage your profile information and account security."
        accent="blue"
        actions={
          <button
            type="button"
            onClick={() => {
              updateCurrentUser(profile);
              toast.success("Profile updated.");
            }}
            className="primary-button"
          >
            <Save size={17} />
            Save Profile
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Panel>
          <div className="p-6 text-center">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green text-4xl font-bold text-white">
              {profile.fullName.charAt(0)}

              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white"
              >
                <Camera size={17} />
              </button>
            </div>

            <h2 className="mt-5 text-lg font-bold text-fg">
              {profile.fullName}
            </h2>

            <p className="text-sm text-muted">
              {user?.roleLabel}
            </p>

            <div className="mt-5 rounded-xl bg-green-500/10 p-4 text-left">
              <div className="flex items-center gap-2 text-brand-green">
                <ShieldCheck size={18} />

                <p className="text-sm font-bold">
                  Account Protected
                </p>
              </div>

              <p className="mt-2 text-xs text-muted">
                Multi-factor authentication is enabled.
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Profile Information"
          description="Personal and corporate information"
        >
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Full Name
              </label>

              <div className="relative">
                <UserCircle
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  className="app-input pl-12"
                  value={profile.fullName}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      fullName: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  className="app-input pl-12"
                  value={profile.email}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      email: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Department
              </label>

              <input
                className="app-input"
                value={profile.department}
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    department: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-fg">
                Role
              </label>

              <input
                className="app-input"
                value={user?.roleLabel || ""}
                disabled
              />
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}