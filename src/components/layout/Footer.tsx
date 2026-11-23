import { Link } from "react-router-dom";
import { pillars } from "@/data/pillars";

type FooterLink = { label: string; to?: string; href?: string };

// Journal: every topic, in the same order and with the same names as the Journal page filters
const journalLinks: FooterLink[] = pillars.map((pillar) => ({ label: pillar.navLabel, to: `/${pillar.slug}` }));

// Platform and Connect are A to Z ("The" is skipped when sorting, so The Edit sits under E)
const platformLinks: FooterLink[] = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "The Edit", to: "/lifestyle" },
  { label: "Free Journal", to: "/downloads" },
  // Plain link so the browser lands on the Letter section of the homepage
  { label: "The Letter", href: "/#the-letter" },
  { label: "The Suitcase", to: "/the-suitcase" },
  { label: "Work With Me", to: "/work-with-me" },
];

const connectLinks: FooterLink[] = [
  { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/missjooo" },
  { label: "Facebook", href: "https://www.facebook.com/share/1JpvRLVBsj/?mibextid=wwXIfr" },
  { label: "Instagram", href: "https://www.instagram.com/missjooo98/" },
  { label: "Linktree", href: "https://linktr.ee/missjooo98" },
  { label: "TikTok", href: "https://www.tiktok.com/@missjooo98" },
];

const linkClass = "text-journal-bg/70 hover:text-journal-champagne transition-colors duration-300";

const Column = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <nav aria-label={title}>
    <h2 className="font-serif text-base font-semibold text-journal-champagne">{title}</h2>
    <ul className="mt-4 space-y-2.5 font-sans text-[13px] font-light">
      {links.map(({ label, to, href }) => (
        <li key={label}>
          {to ? (
            <Link to={to} className={linkClass}>
              {label}
            </Link>
          ) : href.startsWith("http") ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {label}
            </a>
          ) : (
            <a href={href} className={linkClass}>
              {label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="keep-light-palette bg-journal-text text-journal-bg border-t border-journal-champagne/30">
      <div className="container mx-auto px-6 pt-12 pb-8 md:pt-14 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div>
            <Link
              to="/"
              aria-label="Miss Joo Writes, home"
              className="font-logo text-lg lg:text-xl font-bold tracking-tight text-journal-bg hover:text-journal-champagne transition-colors duration-300"
            >
              miss joo writes
            </Link>
            <p className="mt-4 max-w-sm font-sans text-[13px] font-light leading-relaxed text-journal-bg/70">
              A platform for women who want to think more clearly, understand themselves more deeply, and live with greater intention.
            </p>
          </div>

          {/* Two columns side by side on phones, all in one row from tablets up */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:contents">
            <Column title="Journal" links={journalLinks} />
            <Column title="Platform" links={platformLinks} />
            <Column title="Connect" links={connectLinks} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-journal-bg/10 pt-6 font-sans text-[11px] text-journal-bg/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>© {currentYear} Miss Joo Writes. All rights reserved.</p>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <Link to="/privacy-policy" className="hover:text-journal-champagne transition-colors duration-300">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-journal-champagne transition-colors duration-300">
              Terms of Use
            </Link>
          </div>
          <p className="font-serif italic text-sm text-journal-champagne/80">Written with intention.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
