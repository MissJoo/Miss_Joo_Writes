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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-500">
      <nav className="container mx-auto px-6 lg:px-12">
        {/* Top Row: Logo Centered */}
        <div className="flex items-center justify-center py-6 lg:py-8">
          <Link
            to="/"
            className="font-serif text-3xl lg:text-4xl tracking-[0.15em] text-foreground hover:text-primary transition-colors duration-500"
          >
            Miss Joo Writes
          </Link>
        </div>

        {/* Desktop Navigation - separated by pipes like the sample */}
        <div className="hidden md:flex items-center justify-center gap-0 pb-4">
          {navLinks.map((link, index) => (
            <div key={link.path} className="flex items-center">
              {index > 0 && (
                <span className="text-border mx-4 text-sm select-none">|</span>
              )}
              <Link
                to={link.path}
                className={cn(
                  "relative text-xs tracking-[0.15em] uppercase font-sans font-medium transition-all duration-300",
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end -mt-12 pb-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
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
      {/* Blush/Taupe Banner Strip - like the sample's ripped-edge band */}
      <div className="w-full h-3 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30"></div>
    </header>
  );
};

export default Header;
