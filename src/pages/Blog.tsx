import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { cn } from "@/lib/utils";

const categories = ["All", "Thoughts", "Life", "Healing", "Random"];

const allPosts = [
  {
    title: "The Quiet Pressure to Have It All Figured Out",
    excerpt: "There was a time when I genuinely believed life would make more sense by now. I thought adulthood would eventually arrive with answers. Instead, it arrived with more questions.",
    date: "July 21, 2026",
    category: "Thoughts",
    slug: "quiet-pressure-figured-out",
  },
  {
    title: "The Woman I'm Slowly Becoming",
    excerpt: "Growth doesn't always arrive with a celebration. Sometimes it arrives so quietly that you only notice it when you look back.",
    date: "July 14, 2026",
    category: "Healing",
    slug: "woman-im-slowly-becoming",
  },
  {
    title: "The Things I Never Expected to Miss Until I Moved to Qatar",
    excerpt: "I expected the homesickness. I expected to miss birthdays, holidays, and Sunday lunches. What I didn't expect were the little things. The ordinary things.",
    date: "July 07, 2026",
    category: "Life",
    slug: "things-i-never-expected-to-miss",
  },
  {
    title: "Qatar Days Through a Filipina Woman's Eyes",
    excerpt: "There are days in Qatar that feel too bright, too hot, too quiet, and too far from everything I once called home.",
    date: "July 02, 2026",
    category: "Life",
    slug: "qatar-days-filipina",
  },
  {
    title: "What Peace Taught Me About Letting Go",
    excerpt: "I used to think letting go would feel like one big decision. Like one day I would wake up, feel nothing, and finally be ready. But it did not happen that way.",
    date: "June 24, 2026",
    category: "Healing",
    slug: "what-peace-taught-me",
  },
  {
    title: "5 Signs You're Emotionally Tired From Trying Too Hard",
    excerpt: "There is a kind of tiredness that does not look obvious. You still wake up. You still reply to messages. You still do what you have to do. But inside, something feels heavy.",
    date: "June 16, 2026",
    category: "Healing",
    slug: "emotionally-tired",
  },
  {
    title: "There is a difference between fighting for love and forcing it",
    excerpt: "Love should not feel like a guessing game. Fighting for love means both people are choosing each other. Forcing it means you are trying to convince someone to choose you. That is where the pain begins.",
    date: "June 12, 2026",
    category: "Thoughts",
    slug: "fighting-vs-forcing-love",
  },
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
    excerpt: "There's a kind of calm that doesn't come from everything being perfect.",
    date: "February 19, 2026",
    category: "Healing",
    slug: "calm-me",
  },
  {
    title: "I'm becoming more selective with my energy",
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
    excerpt: "Lately, I've been meeting a version of myself I don't fully recognize....",
    date: "January 13, 2026",
    category: "Healing",
    slug: "version-of-me",
  },
  {
    title: "What I'm leaving behind without guilt",
    excerpt: "Choosing peace over explanations....",
    date: "January 08, 2026",
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
    excerpt: "I've learned that strength doesn't always look loud. Some days, it's simply getting through the day without explaining why you feel heavy....",
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
    : activeCategory === "Thoughts"
      ? allPosts.filter(post => post.category === "Thoughts" || post.category === "Reflections" || post.category === "Random")
      : allPosts.filter(post => post.category === activeCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 lg:py-28 bg-journal-bg border-b border-journal-border/30">
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

      {/* Categories */}
      <section className="py-6 border-b border-journal-border/30 sticky top-16 lg:top-20 bg-journal-bg/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:gap-x-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "text-[10px] tracking-[0.25em] uppercase font-medium font-sans pb-1 transition-all duration-300 border-b-[1px]",
                  activeCategory === category
                    ? "text-journal-gold border-journal-gold"
                    : "text-journal-muted border-transparent hover:text-journal-text hover:border-journal-border/60"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

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
                <BlogPostCard {...post} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-journal-card border border-journal-border max-w-md mx-auto rounded-[2px]">
              <p className="text-journal-text-secondary font-light text-sm">
                No entries in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
