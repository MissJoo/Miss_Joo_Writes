import { Link } from "react-router-dom";
import { pillars, type PillarSlug } from "@/data/pillars";
import { cn } from "@/lib/utils";

interface PillarNavProps {
  active?: PillarSlug;
  className?: string;
}

/** Row of links to the topic hubs. */
const PillarNav = ({ active, className }: PillarNavProps) => (
  <nav aria-label="Topics" className={cn("flex flex-wrap justify-center gap-2", className)}>
    {pillars.map((pillar) => (
      <Link
        key={pillar.slug}
        to={`/${pillar.slug}`}
        aria-current={active === pillar.slug ? "page" : undefined}
        className={cn(
          "rounded-full border px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300",
          active === pillar.slug
            ? "bg-journal-gold text-journal-bg border-journal-gold shadow-sm"
            : "text-journal-muted border-journal-border/60 hover:text-journal-text hover:border-journal-gold/50 bg-transparent",
        )}
      >
        {pillar.navLabel}
      </Link>
    ))}
  </nav>
);

export default PillarNav;
