import * as React from "react";

export type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "vangoride.theme";

interface ThemeContextValue {
  theme: Theme;
  resolved: Resolved;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystem(): Resolved {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(resolved: Resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "dark";
  });
  const [resolved, setResolved] = React.useState<Resolved>(() =>
    theme === "system" ? getSystem() : (theme as Resolved),
  );

  React.useEffect(() => {
    const next: Resolved = theme === "system" ? getSystem() : theme;
    setResolved(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // React to system pref changes when in "system" mode
  React.useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next: Resolved = mq.matches ? "dark" : "light";
      setResolved(next);
      apply(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolved,
      setTheme: setThemeState,
      toggle: () => setThemeState(resolved === "dark" ? "light" : "dark"),
    }),
    [theme, resolved],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/**
 * Inline script that runs before React hydrates to prevent
 * flash-of-incorrect-theme. Inject in <head>.
 */
export const themeInitScript = `(() => {
  try {
    var k = '${STORAGE_KEY}';
    var t = localStorage.getItem(k) || 'dark';
    var r = t === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.classList.toggle('dark', r === 'dark');
    document.documentElement.style.colorScheme = r;
  } catch (e) {}
})();`;
