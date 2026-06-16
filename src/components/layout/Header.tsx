import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const isActive = (path: string) => location.pathname === path;

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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
