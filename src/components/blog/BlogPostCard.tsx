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

const BlogPostCard = ({ title, excerpt, date, category, slug, featured = false }: BlogPostCardProps) => {
  return (
    <article 
      className={cn(
        "group flex flex-col justify-between p-6 border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-1 transition-all duration-300 rounded-[2px] shadow-sm h-full",
        featured ? 'col-span-full' : ''
      )}
    >
      <Link to={`/blog/${slug}`} className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          {/* Category & Date */}
          <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
            <span className="text-journal-gold font-medium">{category}</span>
            <span className="w-4 h-px bg-journal-border"></span>
            <time>{date}</time>
          </div>

          {/* Title */}
          <h3 
            className={cn(
              "font-serif text-journal-text group-hover:text-journal-gold transition-colors duration-300 leading-snug font-medium",
              featured ? 'text-2xl lg:text-3.5xl' : 'text-xl'
            )}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-journal-text-secondary font-sans leading-relaxed text-sm font-light line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* Read More */}
        <div className="pt-6 border-t border-journal-border/30 mt-6">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-journal-gold group-hover:text-journal-text transition-colors duration-300 font-medium">
            <span>Read more</span>
            <span>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
