import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { scrollToTarget } from "@/lib/smoothScroll";

interface NavLink {
  name: string;
  path: string;
  /** Shown as a gold outlined pill */
  pill?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Thin gold bar along the bottom of the menu that fills as the page is read
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  const navLinks: NavLink[] = [
    { name: "Journal", path: "/blog" },
    { name: "The Edit", path: "/lifestyle" },
    { name: "About", path: "/about" },
    { name: "Work With Me", path: "/work-with-me" },
    { name: "Contact", path: "/contact" },
    { name: "Free Journal", path: "/downloads", pill: true },
  ];

  const isActive = (path: string) => location.pathname.replace(/\/+$/, "") === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-journal-nav/95 backdrop-blur-md border-b border-journal-border/70 shadow-[0_6px_24px_-16px_rgba(43,31,23,0.35)] py-4" 
          : "bg-journal-nav/90 backdrop-blur-sm border-b border-journal-border/40 py-6"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between transition-all duration-500">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => scrollToTarget(0)}
            className="shrink-0 whitespace-nowrap font-serif text-xl lg:text-2xl font-semibold tracking-[0.08em] text-journal-text hover:text-journal-gold transition-colors duration-500"
          >
            Miss Joo Writes
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-9">
            {navLinks.map((link) => {
              const linkClass = link.pill
                ? cn(
                    "inline-flex items-center whitespace-nowrap rounded-full border border-journal-gold py-1.5 pl-3 pr-[calc(0.75rem-0.12em)] lg:pl-4 lg:pr-[calc(1rem-0.18em)] xl:pr-[calc(1rem-0.25em)] text-[10px] lg:text-[11px] tracking-[0.12em] lg:tracking-[0.18em] xl:tracking-[0.25em] uppercase font-sans font-semibold text-journal-gold transition-colors duration-300 hover:bg-journal-gold/10",
                    isActive(link.path) && "bg-journal-gold/10",
                  )
                : cn(
                    "relative inline-flex items-center gap-1 whitespace-nowrap text-[10px] lg:text-[11px] tracking-[0.12em] lg:tracking-[0.18em] xl:tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 py-1",
                    isActive(link.path) ? "text-journal-gold" : "text-journal-text dark:text-journal-text-secondary hover:text-journal-gold",
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-journal-gold after:transition-all after:duration-500",
                    isActive(link.path) ? "after:w-full" : "after:w-0 hover:after:w-2/3",
                  );
              return (
                <Link key={link.path} to={link.path} className={linkClass}>
                  {link.name}
                </Link>
              );
            })}
            <ThemeToggle className="-ml-2 lg:-ml-4" />
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-journal-text hover:text-journal-gold transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-journal-nav border-b border-journal-border/30",
            isMenuOpen ? "max-h-screen py-8 mt-4" : "max-h-0"
          )}
        >
          {/* Even 26px gaps. Letter spacing also trails the last letter, so a matching left padding keeps each word centred. */}
          <div className="flex flex-col gap-[26px] items-center">
            {navLinks.map((link, index) => (
              <div
                key={link.path}
                className="flex flex-col items-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg tracking-[0.2em] pl-[0.2em] font-serif uppercase transition-all duration-300",
                    link.pill && "rounded-full border border-journal-gold py-2 pl-[calc(1.5rem+0.2em)] pr-6 font-semibold text-journal-gold hover:bg-journal-gold/10",
                    !link.pill && (isActive(link.path) ? "text-journal-gold font-medium" : "text-journal-text dark:text-journal-text-secondary hover:text-journal-gold"),
                  )}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
      {/* Essays have their own reading bar at the top of the screen, so this one steps aside there */}
      <div
        ref={progressRef}
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gold dark:bg-journal-gold",
          /^\/blog\/[^/]+\/?$/.test(location.pathname) && "hidden",
        )}
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />
    </header>
  );
};

export default Header;
