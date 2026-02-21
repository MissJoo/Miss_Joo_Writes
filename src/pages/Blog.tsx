import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { cn } from "@/lib/utils";

const categories = ["All", "Thoughts", "Life", "Healing", "Random"];

const allPosts = [
  {
    title: "I feel calmer in ways I can't fully explain",
    excerpt: "There’s a kind of calm that doesn’t come from everything being perfect.",
    date: "February 19, 2026",
    category: "Healing",
    slug: "calm-me",
  },
  {
    title: "I’m becoming more selective with my energy",
    excerpt: "I've been paying attention on how my body reacts before my mind..",
    date: "February 12, 2026",
    category: "Healing",
    slug: "selective-energy",
  },
  {
    title: "I'm learning to trust myself again",
    excerpt: "For a long time, I questioned myself more than I listened..",
    date: "February 04, 2026",
    category: "Healing",
    slug: "trust-myself",
  },
  {
    title: "January taught me to slow down",
    excerpt: "Not moving was the honest thing I could do..",
    date: "January 27, 2026",
    category: "Healing",
    slug: "slow-down",
  },
  {
    title: "I'm learning to choose myself without explaining",
    excerpt: "For a long time, choosing myself came with guilt....",
    date: "January 20, 2026",
    category: "Healing",
    slug: "choose-myself",
  },
  {
    title: "This version of me feels unfamiliar, and that's okay",
    excerpt: "Lately, I’ve been meeting a version of myself I don’t fully recognize....",
    date: "January 13, 2026",
    category: "Healing",
    slug: "version-of-me",
  },
  {
    title: "What I'm leaving behind without guilt",
    excerpt: "Choosing peace over explanations....",
    date: "Jnauary 08, 2026",
    category: "Healing",
    slug: "behind-guilt",
  },
  {
    title: "Welcoming 2026 with an open heart",
    excerpt: "Closing old chapters, opening new beginnings....",
    date: "December 31, 2025",
    category: "Life",
    slug: "new-beginnings",
  },
  {
    title: "Some days I'm strong, some days I'm just tired",
    excerpt: "I’ve learned that strength doesn’t always look loud. Some days, it’s simply getting through the day without explaining why you feel heavy....",
    date: "December 30, 2025",
    category: "Healing",
    slug: "strong-days",
  },
  {
    title: "Learning to embrace the quiet moments",
    excerpt: "There's something profoundly beautiful about sitting with silence. Not the uncomfortable kind that begs to be filled, but the kind that wraps around you like a warm blanket on a winter evening. I've spent so much of my life afraid of stillness...",
    date: "December 28, 2025",
    category: "Thoughts",
    slug: "embrace-quiet-moments",
  },
  {
    title: "On growing through change",
    excerpt: "Change has always felt like losing pieces of myself. But lately, I've started to see it differently—as collecting new pieces, adding to who I am rather than subtracting from it...",
    date: "December 20, 2025",
    category: "Healing",
    slug: "growing-through-change",
  },
  {
    title: "Letters I never sent",
    excerpt: "Sometimes the most important conversations happen in the space between what we say and what we mean. These are the words I've been holding onto, the things I wish I could have said...",
    date: "December 15, 2025",
    category: "Life",
    slug: "letters-never-sent",
  },
  {
    title: "A random Tuesday in December",
    excerpt: "Not every day needs to be remarkable. Sometimes the most beautiful moments are the ones that pass without fanfare, the quiet Tuesdays that become treasured memories...",
    date: "December 10, 2025",
    category: "Random",
    slug: "random-tuesday",
  },
  {
    title: "The art of letting go",
    excerpt: "Letting go doesn't mean forgetting. It means making peace with the memories, allowing them to exist without the weight of what could have been...",
    date: "December 5, 2025",
    category: "Healing",
    slug: "art-of-letting-go",
  },
  {
    title: "Midnight conversations with myself",
    excerpt: "There's honesty that only comes out at 2 AM, when the world is asleep and you're left with nothing but your thoughts and the soft glow of a bedside lamp...",
    date: "November 28, 2025",
    category: "Thoughts",
    slug: "midnight-conversations",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl animate-fade-in-up">
              The Journal
            </h1>
            <p className="text-muted-foreground font-sans text-lg animate-fade-in-delay-1">
              Thoughts, reflections, and the stories that shape who I am.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border/50 sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "text-xs tracking-widest uppercase transition-all duration-300 pb-1 border-b-2",
                  activeCategory === category
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <BlogPostCard {...post} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-sans">
                No posts in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
