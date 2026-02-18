import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/blog" },
    { name: "Shared Experiences", path: "/shared-experiences" },
    { name: "Downloads", path: "/downloads" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border/40 transition-all duration-500">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-32 transition-all duration-500">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl lg:text-3xl tracking-widest text-foreground hover:text-primary transition-colors duration-500"
          >
            MISS JOO WRITES
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative text-xs tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                  "after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-primary after:transition-all after:duration-500",
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
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg tracking-wide font-sans transition-all duration-300",
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
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
