import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { pillars } from "@/data/pillars";

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

  const navLinks = [
    { name: "Journal", path: "/blog" },
    { name: "Lifestyle", path: "/lifestyle" },
    { name: "About", path: "/about" },
    { name: "Free Journal", path: "/downloads" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname.replace(/\/+$/, "") === path;
  const isTopicActive = pillars.some((pillar) => isActive(`/${pillar.slug}`));

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-journal-bg/95 backdrop-blur-md border-b border-journal-border/50 py-4" 
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between transition-all duration-500">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif text-xl lg:text-2xl font-semibold tracking-[0.08em] text-journal-text hover:text-journal-gold transition-colors duration-500"
          >
            Miss Joo Writes<span className="text-journal-gold">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {/* Topics menu: opens on hover or keyboard focus. Hidden on tablets, where the bar is full. */}
            <div className="group relative hidden lg:block">
              <button
                type="button"
                aria-haspopup="true"
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] tracking-[0.25em] uppercase font-sans font-medium transition-colors duration-300 py-1",
                  isTopicActive ? "text-journal-gold" : "text-journal-text-secondary hover:text-journal-gold",
                )}
              >
                Topics
                <ChevronDown
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="min-w-[200px] border border-journal-border bg-journal-bg py-3 shadow-[0_12px_40px_-12px_rgba(139,106,67,0.25)] rounded-[2px]">
                  {pillars.map((pillar) => (
                    <li key={pillar.slug}>
                      <Link
                        to={`/${pillar.slug}`}
                        className={cn(
                          "block px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-300",
                          isActive(`/${pillar.slug}`) ? "text-journal-gold" : "text-journal-text-secondary hover:text-journal-gold",
                        )}
                      >
                        {pillar.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative text-[11px] tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 py-1",
                  isActive(link.path)
                    ? "text-journal-gold"
                    : "text-journal-text-secondary hover:text-journal-gold",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-journal-gold after:transition-all after:duration-500",
                  isActive(link.path) ? "after:w-full" : "after:w-0 hover:after:w-2/3"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-journal-text hover:text-journal-gold transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-journal-bg border-b border-journal-border/30",
            isMenuOpen ? "max-h-screen py-8 mt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg tracking-[0.2em] font-serif uppercase transition-all duration-300 py-1",
                  isActive(link.path)
                    ? "text-journal-gold font-medium"
                    : "text-journal-text-secondary hover:text-journal-gold",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-10 h-px bg-journal-champagne/40" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium">Topics</span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 px-6">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  to={`/${pillar.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-300",
                    isActive(`/${pillar.slug}`) ? "text-journal-gold" : "text-journal-text-secondary hover:text-journal-gold",
                  )}
                >
                  {pillar.navLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
