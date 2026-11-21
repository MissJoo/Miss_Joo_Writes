// Light/dark theme. Every visit starts in light mode; switching to dark lasts for that visit only
// (sessionStorage, on the reader's own device). index.html applies the same rule inline before first paint.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "mj-theme";

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
    sessionStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice still applies to this page
  }
  applyTheme(theme);
};
