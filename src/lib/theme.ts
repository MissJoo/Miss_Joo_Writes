// Light/dark theme. The reader's choice is kept in localStorage on their own device only.
// Until they choose, the site follows their device setting.
// index.html runs the same logic inline before first paint, so pages never flash the wrong theme.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "mj-theme";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

/** The theme currently applied to the page. */
export const getAppliedTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
};

export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice still applies for this visit
  }
  applyTheme(theme);
};

/** Follows device changes while the reader hasn't picked a theme. Returns an unsubscribe function. */
export const followSystemTheme = (onChange: (theme: Theme) => void) => {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => {
    if (getStoredTheme()) return;
    const theme = systemTheme();
    applyTheme(theme);
    onChange(theme);
  };
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};
