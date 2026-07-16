import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEY = "theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof localStorage === "undefined") {
      return "light";
    }

    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);
    root.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);

    document.body.style.backgroundColor = isDark ? "#020617" : "#f3efe6";
    document.body.style.color = isDark ? "#e2e8f0" : "#0f172a";
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === THEME_KEY && event.newValue) {
        setThemeState(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme: (nextTheme) => setThemeState(nextTheme),
      toggleTheme: () =>
        setThemeState((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
