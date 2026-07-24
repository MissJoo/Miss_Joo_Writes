import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  featured?: boolean;
}

// Rough reading time estimate
const readingTime = (excerpt: string) => {
  const words = excerpt.split(" ").length;
  // Estimate full post at ~15x the excerpt length, read at 200 WPM
  const mins = Math.max(1, Math.round((words * 15) / 200));
  return `${mins} min read`;
};

const categoryColors: Record<string, string> = {
  Healing:    "bg-rose-50 text-rose-700/80 border-rose-200",
  Thoughts:   "bg-amber-50 text-amber-700/80 border-amber-200",
  Life:       "bg-sky-50 text-sky-700/80 border-sky-200",
  Random:     "bg-violet-50 text-violet-700/80 border-violet-200",
  Reflections:"bg-emerald-50 text-emerald-700/80 border-emerald-200",
};

const BlogPostCard = ({ title, excerpt, date, category, slug, featured = false }: BlogPostCardProps) => {
  const pillClass = categoryColors[category] ?? "bg-journal-bg-secondary text-journal-gold border-journal-border";

  return (
    <article
      className={cn(
        // Base
        "group relative flex flex-col justify-between bg-journal-card border border-journal-border rounded-[3px] overflow-hidden h-full",
        // Warm depth shadow
        "shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)]",
        // Hover: lift + stronger warm shadow
        "hover:shadow-[0_12px_40px_-8px_rgba(139,106,67,0.22),0_4px_16px_-4px_rgba(0,0,0,0.07)]",
        "hover:-translate-y-[3px] transition-all duration-400",
        featured ? "col-span-full" : ""
      )}
    >
      {/* Gold left accent bar — slides in on hover */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] bg-journal-champagne origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out rounded-l-[3px]"
        aria-hidden="true"
      />

      <Link to={`/blog/${slug}`} className="flex flex-col justify-between h-full p-6 lg:p-7">
        <div className="space-y-4">
          {/* Category pill + date */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={cn(
                "inline-block text-[10px] tracking-[0.2em] uppercase font-semibold font-sans px-2.5 py-[3px] rounded-full border",
                pillClass
              )}
            >
              {category}
            </span>
            <span className="w-3 h-px bg-journal-border" />
            <time className="text-[10px] tracking-[0.2em] uppercase text-journal-muted">{date}</time>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "font-serif text-journal-text group-hover:text-journal-gold transition-colors duration-300 leading-snug font-medium",
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            )}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-journal-text-secondary font-sans leading-relaxed text-sm font-light line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* Footer row */}
        <div className="pt-5 mt-5 border-t border-journal-border/40 flex items-center justify-between">
          {/* Animated read more */}
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-journal-gold group-hover:text-journal-text transition-colors duration-300 font-semibold">
            <span>Read entry</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          {/* Reading time */}
          <span className="text-[10px] text-journal-muted tracking-wide font-sans">
            {readingTime(excerpt)}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
