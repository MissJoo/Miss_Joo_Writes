import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { cn } from "@/lib/utils";
import { posts, readingTime } from "@/data/posts";
import { pillars, type PillarSlug } from "@/data/pillars";

// "All" shows every post, including Journal-only posts that have no topic
const filters: { key: PillarSlug | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...pillars.map((pillar) => ({ key: pillar.slug, label: pillar.navLabel })),
];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState<PillarSlug | "all">("all");

  const filteredPosts = activeFilter === "all" ? posts : posts.filter((post) => post.pillar === activeFilter);

  return (
    <Layout>
      {/* Header */}
      <section className="flex min-h-[calc(100svh-85px)] items-center border-b border-journal-border/30 bg-journal-bg py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              The Digital Sanctuary
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">
              The Journal
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
              Thoughts, reflections, healing, and the quiet moments that shape who we are.
            </p>
          </div>
        </div>
      </section>

      {/* Topic filter */}
      <div
        className="border-b border-journal-border/30 bg-journal-bg py-3 md:py-4"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            <div className="-mx-6 flex flex-1 flex-nowrap gap-1.5 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:gap-2 md:px-0">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  aria-pressed={activeFilter === filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 md:px-3 md:text-[10px] md:tracking-[0.2em]",
                    activeFilter === filter.key
                      ? "bg-journal-gold text-journal-bg border-journal-gold shadow-sm"
                      : "text-journal-muted border-journal-border/60 hover:text-journal-text hover:border-journal-gold/50 bg-transparent"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <span className="hidden shrink-0 font-sans text-[10px] uppercase tracking-widest text-journal-muted sm:block">
              {filteredPosts.length} {filteredPosts.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
              >
                <BlogPostCard {...post} readingTime={readingTime(post)} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-journal-card border border-journal-border max-w-md mx-auto rounded-[2px]">
              <p className="text-journal-text-secondary font-light text-sm">
                No entries in this topic yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* The Letter */}
      <section className="pb-20 md:pb-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <NewsletterSignup source="topic-page" detail="journal" />
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
