import { Link } from "react-router-dom";

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
      className={`group relative py-8 border-b border-border/30 hover:border-border transition-colors duration-500 ${featured ? 'col-span-full border-t border-border/60' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap min-w-[120px]">
          {date}
        </span>
        
        <div className="space-y-4 flex-1">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary/80 block">
            {category}
          </span>

          <h3 className="font-serif text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            <Link to={`/blog/${slug}`} className="before:absolute before:inset-0">
              {title}
            </Link>
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed font-light font-sans max-w-2xl">
            {excerpt}
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
