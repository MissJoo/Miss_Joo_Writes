import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import NewsletterSignup from "@/components/NewsletterSignup";
import NotFound from "@/pages/NotFound";
import { getPost, getRelatedPosts, readingTime } from "@/data/posts";
import { getPillar } from "@/data/pillars";
import { canonicalUrl } from "@/lib/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

  // Reading progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = getRelatedPosts(post);
  const pillar = getPillar(post.pillar);
  const shareUrl = canonicalUrl(`/blog/${post.slug}`);

  const intro = post.content[0];
  const bodyParagraphs = post.content;

  // Helper to determine if a paragraph should be styled as a pull quote
  const isPullQuote = (text: string) => {
    const cleaned = text.trim();
    if (cleaned.startsWith("\u201c") && cleaned.endsWith("\u201d")) return true;
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) return true;
    if (cleaned.length > 5 && cleaned.length < 80 && !cleaned.includes(".") && !cleaned.includes(",")) return true;
    return false;
  };

  // Helper to detect section headings (prefixed with "##:")
  const isSectionHeading = (text: string) => text.startsWith("##:");

  return (
    <Layout>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[999] h-[3px] bg-gradient-to-r from-journal-champagne via-journal-gold to-journal-champagne transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Back Link */}
      <section className="pt-24 lg:pt-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-journal-muted hover:text-journal-gold transition-colors duration-300 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-xs tracking-wider uppercase font-medium">Back to journal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Post Header */}
      <section className="pt-10 pb-6 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Category & Date */}
            <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted animate-fade-in">
              {pillar ? (
                <Link to={`/${pillar.slug}`} className="text-journal-gold font-semibold hover:text-journal-text transition-colors">
                  {pillar.name}
                </Link>
              ) : (
                <span className="text-journal-gold font-semibold">{post.category}</span>
              )}
              <span className="text-journal-border">•</span>
              <time dateTime={post.datePublished}>{post.date}</time>
              <span className="text-journal-border">•</span>
              <span>{readingTime(post)}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-4.5xl leading-tight text-journal-text animate-fade-in-up font-medium">
              {post.title}
            </h1>

            {/* Intro / Excerpt */}
            <p className="text-journal-text-secondary/90 italic font-serif text-lg md:text-xl leading-relaxed max-w-xl mx-auto animate-fade-in-delay-1 pt-4 border-t border-journal-border/30">
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* Soft Divider Before Content */}
      <div className="w-16 h-[1px] bg-journal-border/50 mx-auto my-6"></div>

      {/* Post Content */}
      <section className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <article className="max-w-2xl mx-auto font-sans text-[17px] leading-[1.85] text-journal-text-secondary space-y-7 font-light">
            {bodyParagraphs.map((paragraph, index) => {
              if (isSectionHeading(paragraph)) {
                return (
                  <h2
                    key={index}
                    className="font-serif text-xl md:text-2xl text-journal-text font-medium mt-14 mb-2 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    {paragraph.replace("##:", "").trim()}
                  </h2>
                );
              }
              if (isPullQuote(paragraph)) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-[3px] border-journal-champagne pl-6 my-10 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed py-2 opacity-0 animate-fade-in bg-journal-bg-secondary/30 pr-4 rounded-r-[2px]"
                    style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    {paragraph}
                  </blockquote>
                );
              }
              return (
                <p
                  key={index}
                  className={`opacity-0 animate-fade-in whitespace-pre-line text-left ${
                    index === 0
                      ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-journal-gold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none"
                      : ""
                  }`}
                  style={{ animationDelay: `${0.2 + Math.min(index, 8) * 0.05}s`, animationFillMode: "forwards" }}
                >
                  {paragraph}
                </p>
              );
            })}
          </article>
        </div>
      </section>

      {/* Share */}
      <section className="pb-12 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <ShareButtons url={shareUrl} title={post.title} />
        </div>
      </section>

      {/* Soft Divider After Content */}
      <div className="w-16 h-[1px] bg-journal-border/50 mx-auto my-12"></div>

      {/* Newsletter */}
      <section className="pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <NewsletterSignup source="post" />
        </div>
      </section>

      {/* Read Next Section */}
      <section className="py-16 bg-journal-bg-secondary/20 border-t border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">Continuing the Journey</span>
            <h2 className="font-serif text-2xl text-journal-text">Related Essays</h2>
            <div className="w-8 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map(otherPost => {
              return (
                <Link
                  key={otherPost.slug}
                  to={`/blog/${otherPost.slug}`}
                  className="group relative flex flex-col justify-between p-6 border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-[3px] transition-all duration-300 rounded-[3px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)] hover:shadow-[0_10px_32px_-8px_rgba(139,106,67,0.20)]"
                >
                  {/* Accent bar */}
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-journal-champagne origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-[3px]" aria-hidden="true" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-journal-gold font-semibold bg-journal-gold/10 border border-journal-gold/20 px-2 py-[2px] rounded-full">{otherPost.category}</span>
                      <time dateTime={otherPost.datePublished} className="text-[10px] tracking-[0.15em] uppercase text-journal-muted">{otherPost.date}</time>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-journal-muted">· {readingTime(otherPost)}</span>
                    </div>
                    <h3 className="font-serif text-lg text-journal-text group-hover:text-journal-gold transition-colors leading-snug font-medium">{otherPost.title}</h3>
                    <p className="text-xs text-journal-text-secondary font-light leading-relaxed line-clamp-2">
                      {otherPost.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-journal-gold mt-5 uppercase tracking-wider font-semibold">
                    Read entry <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
