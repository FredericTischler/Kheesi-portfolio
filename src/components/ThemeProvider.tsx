/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  toggleHighContrast: () => void;
};

const THEME_STORAGE_KEY = "ft-portfolio-theme";
const CONTRAST_STORAGE_KEY = "ft-portfolio-contrast";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(CONTRAST_STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("contrast");
    } else {
      root.classList.remove("contrast");
    }
    window.localStorage.setItem(CONTRAST_STORAGE_KEY, highContrast ? "true" : "false");
  }, [highContrast]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) return;
      setThemeState(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);
  const setHighContrast = useCallback((value: boolean) => setHighContrastState(value), []);
  const toggleHighContrast = useCallback(() => {
    setHighContrastState((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, highContrast, setHighContrast, toggleHighContrast }),
    [theme, setTheme, toggleTheme, highContrast, setHighContrast, toggleHighContrast],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
