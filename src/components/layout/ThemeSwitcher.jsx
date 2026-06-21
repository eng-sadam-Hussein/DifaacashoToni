import { useState } from "react";

import {
  Check,
  Circle,
  Moon,
  Palette,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "Soft light interface",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Slate dark interface",
    icon: Moon,
  },
  {
    value: "black",
    label: "Black",
    description: "Pure black interface",
    icon: Circle,
  },
  {
    value: "white",
    label: "White",
    description: "Pure white interface",
    icon: Palette,
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const activeTheme = themeOptions.find(
    (option) => option.value === theme
  );

  const ActiveIcon = activeTheme?.icon || Sun;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-elevated hover:text-fg"
        aria-label="Change system theme"
      >
        <ActiveIcon size={19} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close theme menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
          />

          <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-line bg-surface p-2 shadow-panel">
            <div className="px-3 py-2">
              <p className="text-sm font-bold text-fg">
                Appearance
              </p>

              <p className="text-xs text-muted">
                Select the system theme
              </p>
            </div>

            <div className="space-y-1">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const selected = theme === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTheme(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      selected
                        ? "bg-blue-500/10 text-brand-blue"
                        : "text-fg hover:bg-elevated"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        selected
                          ? "bg-brand-blue text-white"
                          : "bg-elevated text-muted"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {option.label}
                      </p>

                      <p className="text-xs text-muted">
                        {option.description}
                      </p>
                    </div>

                    {selected && <Check size={17} />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}