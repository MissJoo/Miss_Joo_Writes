import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { followSystemTheme, getAppliedTheme, setTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Sun/moon button that switches between light and dark mode. */
const ThemeToggle = ({ className }: { className?: string }) => {
  // Prerendered HTML can't know the theme, so the label is settled after mount; the icon follows the
  // .dark class through CSS and is right from the first paint.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(getAppliedTheme());
    return followSystemTheme(setThemeState);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        setThemeState(next);
      }}
      aria-label={theme ? `Switch to ${next} mode` : "Switch colour theme"}
      title={theme ? `Switch to ${next} mode` : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-journal-text-secondary hover:text-journal-gold transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne",
        className,
      )}
    >
      <Moon size={17} strokeWidth={1.6} aria-hidden="true" className="dark:hidden" />
      <Sun size={17} strokeWidth={1.6} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
