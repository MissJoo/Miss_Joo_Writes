import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { pillars } from "@/data/pillars";
import { posts } from "@/data/posts";
import ThemeToggle from "./ThemeToggle";
import { scrollToTarget } from "@/lib/smoothScroll";

interface NavLink {
  name: string;
  path: string;
  /** Shown in a small dropdown under this link (desktop) or indented under it (mobile) */
  children?: { name: string; path: string }[];
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
    {
      name: "Journal",
      path: "/blog",
      // Topics with at least one essay; the others join the list once their first essay is posted
      children: [
        { name: "All Entries", path: "/blog" },
        ...pillars
          .filter((pillar) => posts.some((post) => post.pillar === pillar.slug))
          .map((pillar) => ({ name: pillar.name, path: `/${pillar.slug}` })),
      ],
    },
    { name: "Free Journal", path: "/downloads" },
    { name: "The Edit", path: "/lifestyle" },
    { name: "About", path: "/about" },
    { name: "Work With Me", path: "/work-with-me" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname.replace(/\/+$/, "") === path;
  const isLinkActive = (link: NavLink) => isActive(link.path) || !!link.children?.some((child) => isActive(child.path));

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
              const linkClass = cn(
                "relative inline-flex items-center gap-1 whitespace-nowrap text-[10px] lg:text-[11px] tracking-[0.12em] lg:tracking-[0.18em] xl:tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 py-1",
                isLinkActive(link) ? "text-journal-gold" : "text-journal-text dark:text-journal-text-secondary hover:text-journal-gold",
                "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-journal-gold after:transition-all after:duration-500",
                isLinkActive(link) ? "after:w-full" : "after:w-0 hover:after:w-2/3",
              );
              if (!link.children) {
                return (
                  <Link key={link.path} to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                );
              }
              // A link with a small menu: opens on hover or keyboard focus
              return (
                <div key={link.path} className="group relative">
                  <Link to={link.path} className={linkClass} aria-haspopup="true">
                    {link.name}
                    <ChevronDown
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-[180px] border border-journal-border bg-journal-nav py-3 shadow-[0_12px_40px_-12px_rgba(139,106,67,0.25)] rounded-[2px]">
                      {link.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={cn(
                              "block whitespace-nowrap px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-300",
                              isActive(child.path) ? "text-journal-gold" : "text-journal-text dark:text-journal-text-secondary hover:text-journal-gold",
                            )}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link, index) => (
              <div
                key={link.path}
                className="flex flex-col items-center gap-2 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg tracking-[0.2em] font-serif uppercase transition-all duration-300 py-1",
                    isActive(link.path) ? "text-journal-gold font-medium" : "text-journal-text dark:text-journal-text-secondary hover:text-journal-gold",
                  )}
                >
                  {link.name}
                </Link>
                {link.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "text-[11px] tracking-[0.25em] uppercase font-sans transition-colors duration-300",
                        isActive(child.path) ? "text-journal-gold" : "text-journal-muted hover:text-journal-gold",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
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
