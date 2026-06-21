import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

const allowedThemes = [
  "light",
  "dark",
  "black",
  "white",
];

function getInitialTheme() {
  const savedTheme = localStorage.getItem("afess-theme");

  if (allowedThemes.includes(savedTheme)) {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" || theme === "black"
    );

    localStorage.setItem("afess-theme", theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      themes: allowedThemes,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
}