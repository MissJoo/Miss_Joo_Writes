import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <Link 
            to="/" 
            className="font-serif text-2xl tracking-wide text-foreground hover:text-primary transition-colors duration-300"
          >
            missjooo
          </Link>

          {/* Tagline */}
          <p className="text-muted-foreground text-center max-w-md font-sans text-sm leading-relaxed">
            A digital journal for thoughts, reflections, and the beautiful chaos of life.
          </p>

          {/* Instagram Link */}
          <a
            href="https://instagram.com/missjooo98"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <Instagram size={18} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm tracking-wide">@missjooo98</span>
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {["Home", "Journal", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : item === "Journal" ? "/blog" : `/${item.toLowerCase()}`}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 tracking-wide">
            © {currentYear} missjooo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
