import { useState } from "react";

import {
  Building2,
  LockKeyhole,
  Palette,
  Save,
  Share2,
} from "lucide-react";

import toast from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import { useTheme } from "../../context/ThemeContext";

const tabs = [
  {
    id: "general",
    label: "General",
    icon: Building2,
  },
  {
    id: "security",
    label: "Security",
    icon: LockKeyhole,
  },
  {
    id: "sharing",
    label: "Sharing",
    icon: Share2,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
];

export default function SettingsPage({
  mode = "organization",
}) {
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState(
    mode === "preferences"
      ? "appearance"
      : "general"
  );

  const [settings, setSettings] = useState({
    organizationName: "AFESS Corporation",
    domain: "afess.com",
    passwordExpiry: 90,
    lockoutAttempts: 5,
    defaultExpiry: 7,
    allowExternalSharing: true,
    requireOtp: true,
  });

  const saveSettings = () => {
    localStorage.setItem(
      "afess-organization-settings",
      JSON.stringify(settings)
    );

    toast.success("Settings saved successfully.");
  };

  return (
    <section className="page-container">
      <PageHeader
        eyebrow="System Configuration"
        title={
          mode === "preferences"
            ? "Personal Preferences"
            : "Organization Settings"
        }
        description="Configure organization policies, security controls and appearance."
        accent="orange"
        actions={
          <button
            type="button"
            onClick={saveSettings}
            className="orange-button"
          >
            <Save size={17} />
            Save Changes
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
        <Panel className="h-fit">
          <div className="space-y-1 p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                    activeTab === tab.id
                      ? "bg-orange-500/10 text-brand-orange"
                      : "text-muted hover:bg-elevated hover:text-fg"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <div className="p-6">
            {activeTab === "general" && (
              <div className="max-w-2xl space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Organization Name
                  </label>

                  <input
                    className="app-input"
                    value={
                      settings.organizationName
                    }
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        organizationName:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Corporate Domain
                  </label>

                  <input
                    className="app-input"
                    value={settings.domain}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        domain: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="max-w-2xl space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Password Expiration Days
                  </label>

                  <input
                    type="number"
                    className="app-input"
                    value={settings.passwordExpiry}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        passwordExpiry:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Lock Account After Failed Attempts
                  </label>

                  <input
                    type="number"
                    className="app-input"
                    value={settings.lockoutAttempts}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        lockoutAttempts:
                          event.target.value,
                      })
                    }
                  />
                </div>

                <label className="flex items-center gap-3 rounded-xl border border-line bg-elevated p-4">
                  <input
                    type="checkbox"
                    checked={settings.requireOtp}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        requireOtp:
                          event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-orange-500"
                  />

                  <span className="text-sm font-semibold text-fg">
                    Require OTP for sensitive actions
                  </span>
                </label>
              </div>
            )}

            {activeTab === "sharing" && (
              <div className="max-w-2xl space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-fg">
                    Default Link Expiry
                  </label>

                  <select
                    className="app-input"
                    value={settings.defaultExpiry}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        defaultExpiry:
                          event.target.value,
                      })
                    }
                  >
                    <option value="1">1 day</option>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 rounded-xl border border-line bg-elevated p-4">
                  <input
                    type="checkbox"
                    checked={
                      settings.allowExternalSharing
                    }
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        allowExternalSharing:
                          event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-orange-500"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-fg">
                      Allow external sharing
                    </span>

                    <span className="text-xs text-muted">
                      Approval policies still apply.
                    </span>
                  </span>
                </label>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="font-bold text-fg">
                  System Theme
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Select the appearance for the current device.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["light", "Light", "Soft gray background"],
                    ["white", "White", "Pure white interface"],
                    ["dark", "Dark", "Professional slate theme"],
                    ["black", "Black", "High contrast black"],
                  ].map(
                    ([value, label, description]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setTheme(value)
                        }
                        className={`rounded-2xl border p-5 text-left ${
                          theme === value
                            ? "border-brand-orange bg-orange-500/10"
                            : "border-line bg-elevated"
                        }`}
                      >
                        <div
                          className={`h-16 rounded-xl ${
                            value === "light"
                              ? "bg-slate-100"
                              : value === "white"
                                ? "border border-slate-200 bg-white"
                                : value === "dark"
                                  ? "bg-slate-800"
                                  : "bg-black"
                          }`}
                        />

                        <p className="mt-4 font-bold text-fg">
                          {label}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          {description}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </section>
  );
}