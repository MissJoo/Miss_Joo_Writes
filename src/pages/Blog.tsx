import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { cn } from "@/lib/utils";

const categories = ["All", "Thoughts", "Life", "Healing", "Random"];

const allPosts = [
  {
    title: "The black coffee rule",
    excerpt: "For a long time, I took my coffee with a little bit of everything.. until one morning, I poured it black.",
    date: "June 09, 2026",
    category: "Reflections",
    slug: "the-black-coffee-rule",
  },
  {
    title: "I'm learning to exist without performing",
    excerpt: "I spent so long curating how I showed up that I forgot what it felt like to just.. be.",
    date: "June 02, 2026",
    category: "Healing",
    slug: "exist-without-performing",
  },
  {
    title: "This is the season I stopped shrinking",
    excerpt: "For years, I made myself smaller.. smaller opinions, smaller needs, smaller presence.",
    date: "May 26, 2026",
    category: "Life",
    slug: "stopped-shrinking",
  },
  {
    title: "Gratitude for the version of me who kept going",
    excerpt: "I don't say this to her enough.. the version of me who woke up on the hardest mornings and still showed up.",
    date: "May 19, 2026",
    category: "Healing",
    slug: "gratitude-for-me",
  },
  {
    title: "I don't need to prove I've changed",
    excerpt: "There was a time when I wanted everyone to see my growth.. as if growth only mattered when someone acknowledged it.",
    date: "May 12, 2026",
    category: "Thoughts",
    slug: "dont-need-to-prove",
  },
  {
    title: "What peace actually looks like for me",
    excerpt: "For a long time, I imagined peace as the absence of problems.. but that's not peace.",
    date: "May 5, 2026",
    category: "Healing",
    slug: "what-peace-looks-like",
  },
  {
    title: "I'm no longer the version they remember",
    excerpt: "Some people still see the old me when they look at me.. the one who apologized too much.",
    date: "April 28, 2026",
    category: "Healing",
    slug: "no-longer-that-version",
  },
  {
    title: "A quiet Monday that felt like healing",
    excerpt: "Nothing significant happened today.. I woke up slowly, made tea instead of coffee.",
    date: "April 21, 2026",
    category: "Random",
    slug: "quiet-monday",
  },
  {
    title: "Softness is not weakness",
    excerpt: "Somewhere along the way, I learned to harden.. to mistake sharpness for strength.",
    date: "April 14, 2026",
    category: "Thoughts",
    slug: "softness-not-weakness",
  },
  {
    title: "Allowing myself to enjoy things without guilt",
    excerpt: "I caught myself smiling the other day.. genuinely, without thinking.",
    date: "April 7, 2026",
    category: "Life",
    slug: "enjoy-without-guilt",
  },
  {
    title: "I stopped waiting for the right moment",
    excerpt: "I spent a long time waiting.. waiting to feel ready, waiting for the fear to pass.",
    date: "March 31, 2026",
    category: "Healing",
    slug: "stopped-waiting",
  },
  {
    title: "The people who stay don't need convincing",
    excerpt: "I used to exhaust myself trying to keep people close.. explaining, adjusting, dimming.",
    date: "March 24, 2026",
    category: "Healing",
    slug: "people-who-stay",
  },
  {
    title: "Spring came before I felt ready",
    excerpt: "The weather changed before I did.. one morning the light came through differently.",
    date: "March 17, 2026",
    category: "Life",
    slug: "spring-before-ready",
  },
  {
    title: "I'm starting to feel at home in my own company",
    excerpt: "There was a time when being alone felt like something was missing..",
    date: "March 10, 2026",
    category: "Thoughts",
    slug: "my-own-company",
  },
  {
    title: "Some shifts don't need to be announced",
    excerpt: "There are changes happening inside me that I don't know how to explain yet..",
    date: "March 3, 2026",
    category: "Healing",
    slug: "quiet-shifts",
  },
  {
    title: "I no longer force what doesn't flow",
    excerpt: "There was a time I thought effort could fix everything. If the conversation felt cold, I tried to make it warm again.",
    date: "February 24, 2026",
    category: "Healing",
    slug: "no-force",
  },
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
