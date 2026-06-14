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
      className={`group ${featured ? 'col-span-full' : ''}`}
    >
      <Link to={`/blog/${slug}`} className="block">
        <div className="space-y-4">
          {/* Category & Date */}
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-muted-foreground">
            <span className="text-dusty-rose">{category}</span>
            <span className="w-8 h-px bg-border"></span>
            <time>{date}</time>
          </div>

          {/* Title */}
          <h3 
            className={`font-serif text-foreground group-hover:text-primary transition-colors duration-300 leading-tight ${
              featured ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
            }`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground font-sans leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          {/* Read More */}
          <span className="inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            <span className="tracking-wide">Read more</span>
            <span className="w-6 h-px bg-foreground/50 group-hover:w-10 transition-all duration-300"></span>
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
