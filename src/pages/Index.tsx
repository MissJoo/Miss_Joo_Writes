import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import heroImage from "@/assets/hero-image.jpg";

// Sample blog posts data
const blogPosts = [
  {
    title: "What Peace Taught Me About Letting Go",
    excerpt: "I used to think letting go would feel like one big decision. Like one day I would wake up, feel nothing, and finally be ready. But it did not happen that way.",
    date: "June 24, 2026",
    category: "Healing",
    slug: "what-peace-taught-me",
    quote: "Sometimes letting go is not losing someone. Sometimes it is finally getting yourself back.",
    featured: true,
  },
  {
    title: "5 Signs You're Emotionally Tired From Trying Too Hard",
    excerpt: "There is a kind of tiredness that does not look obvious. You still wake up. You still reply to messages. You still do what you have to do. But inside, something feels heavy.",
    date: "June 16, 2026",
    category: "Healing",
    slug: "emotionally-tired",
    quote: "You are not asking for too much. You are just tired of asking the wrong person.",
  },
  {
    title: "There is a difference between fighting for love and forcing it",
    excerpt: "Love should not feel like a guessing game. Fighting for love means both people are choosing each other. Forcing it means you are trying to convince someone to choose you. That is where the pain begins.",
    date: "June 12, 2026",
    category: "Thoughts",
    slug: "fighting-vs-forcing-love",
    quote: "You deserve a love that does not make you feel alone in the effort.",
  },
  {
    title: "The black coffee rule",
    excerpt: "For a long time, I took my coffee with a little bit of everything.. until one morning, I poured it black.",
    date: "June 09, 2026",
    category: "Reflections",
    slug: "the-black-coffee-rule",
    quote: "I'm learning to take my life black. Simple, potent, and exactly as it is. No additions required.",
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
    date: "May 05, 2026",
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
    date: "April 07, 2026",
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
    date: "March 03, 2026",
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
    excerpt: "I've been paying attention on how my body reacts before my mind.. ",
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
    excerpt: "Not moving was the honest thing I could do....",
    date: "January 27, 2026",
    category: "Healing",
    slug: "slow-down",
  },
  {
    title: "I learning to choose myself without explaining",
    excerpt: "For long time, choosing myself came with guilt.....",
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
    excerpt: "I’ve learned that strength doesn’t always look loud. Some days, it’s simply getting through the day without explaining why you feel heavy....",
    date: "December 30, 2025",
    category: "Healing",
    slug: "strong-days",
  },
  {
    title: "Learning to embrace the quiet moments",
    excerpt: "There's something profoundly beautiful about sitting with silence. Not the uncomfortable kind that begs to be filled, but the kind that wraps around you like a warm blanket on a winter evening...",
    date: "December 28, 2025",
    category: "Thoughts",
    slug: "embrace-quiet-moments",
  },
  {
    title: "On growing through change",
    excerpt: "Change has always felt like losing pieces of myself. But lately, I've started to see it differently—as collecting new pieces, adding to who I am...",
    date: "December 20, 2025",
    category: "Healing",
    slug: "growing-through-change",
  },
  {
    title: "Letters I never sent",
    excerpt: "Sometimes the most important conversations happen in the space between what we say and what we mean. These are the words I've been holding...",
    date: "December 15, 2025",
    category: "Life",
    slug: "letters-never-sent",
  },
  {
    title: "A random Tuesday in December",
    excerpt: "Not every day needs to be remarkable. Sometimes the most beautiful moments are the ones that pass without fanfare...",
    date: "December 10, 2025",
    category: "Random",
    slug: "random-tuesday",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-journal-bg pt-20">
        {/* Soft Background Texture Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={heroImage}
            alt="Atmospheric texture"
            className="w-full h-full object-cover opacity-[0.06] contrast-75 saturate-0 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-journal-bg/30 to-journal-bg"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block animate-fade-in">
              “A space where my thoughts learn how to breathe.”
            </span>

            <h1 className="font-serif text-[34px] md:text-[56px] leading-[1.15] text-journal-text animate-fade-in-up tracking-tight max-w-2xl mx-auto">
              For the thoughts we never posted, but still needed to feel.
            </h1>

            <div className="w-16 h-[1px] bg-journal-champagne/60 mx-auto my-6"></div>

            <p className="text-journal-text-secondary text-base md:text-lg font-sans font-light tracking-wide max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
              A soft editorial journal on healing, becoming, love, solitude, slow living, and the quiet moments that shape us.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-delay-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-journal-text text-journal-bg hover:bg-journal-gold hover:text-journal-bg border-none tracking-widest uppercase text-[11px] px-8 py-5 transition-all duration-300 shadow-sm"
                asChild
              >
                <Link to="/blog">
                  Enter the Journal
                </Link>
              </Button>
              <Link 
                to="/blog/emotionally-tired" 
                className="text-journal-gold hover:text-journal-text text-xs tracking-wider uppercase underline underline-offset-4 decoration-journal-champagne font-sans font-medium py-2 transition-colors duration-300"
              >
                Read the latest reflection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reflection Section */}
      <section className="py-20 md:py-28 bg-journal-bg border-t border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">Featured Reflections</h2>
              <div className="w-8 h-px bg-journal-champagne/40 mx-auto mt-3"></div>
            </div>

            <div className="flex flex-col gap-10">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.slug} className="grid md:grid-cols-12 border border-journal-border bg-journal-card hover:border-journal-champagne/50 transition-all duration-500 overflow-hidden rounded-[2px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]">
                  {/* Text Side */}
                  <div className="p-8 md:p-12 lg:p-16 md:col-span-7 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
                      <span>JOURNAL</span>
                      <span className="w-6 h-px bg-journal-border"></span>
                      <time>{post.date}</time>
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3.5xl text-journal-text leading-tight font-medium">
                      {post.title}
                    </h3>

                    <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="pt-2">
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
                      >
                        <span>Read the entry</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>

                  {/* Graphic Side */}
                  <div className="relative md:col-span-5 min-h-[260px] bg-journal-bg-secondary/40 flex items-center justify-center p-8 select-none border-t md:border-t-0 md:border-l border-journal-border/50">
                    <div className="text-center space-y-4 max-w-[240px]">
                      <span className="text-xl text-journal-champagne">✦</span>
                      <p className="font-serif italic text-lg text-journal-text-secondary leading-relaxed">
                        &ldquo;{post.quote || post.excerpt}&rdquo;
                      </p>
                      <div className="w-10 h-px bg-journal-champagne/40 mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-28 bg-journal-bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              About Miss Joo
            </span>

            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text italic font-light leading-snug">
              “A space for thoughts that feel too layered for captions.”
            </h2>

            <p className="text-journal-text-secondary font-sans leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto">
              Miss Joo Writes is my quiet corner of the internet — a space for the thoughts that feel too layered for captions and too meaningful to disappear in the scroll. Here, I write about healing, becoming, love, solitude, beauty, and the small moments that teach us how to return to ourselves.
            </p>

            <div className="font-signature text-3xl text-journal-gold select-none py-1">
              With softness, Miss Joo
            </div>

            <div className="pt-2">
              <Button 
                variant="outline" 
                className="rounded-full border border-journal-gold text-journal-gold hover:bg-journal-bg-secondary hover:text-journal-text hover:border-journal-text tracking-widest uppercase text-[11px] h-11 px-8 transition-colors duration-300" 
                asChild
              >
                <Link to="/about">
                  Read My Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Journal Entries Section */}
      <section className="py-20 md:py-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-journal-border/50 pb-5">
            <div>
              <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">Latest from the Journal</h2>
              <p className="text-[11px] text-journal-muted tracking-widest uppercase mt-1">Reflections and quiet lessons</p>
            </div>
            <Link 
              to="/blog" 
              className="text-xs tracking-[0.2em] uppercase text-journal-gold hover:text-journal-text transition-colors mt-3 md:mt-0 font-medium"
            >
              View All Entries
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between p-6 border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-1 transition-all duration-300 rounded-[2px] shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
                    <span>{post.category}</span>
                    <span className="w-4 h-px bg-journal-border"></span>
                    <time>{post.date}</time>
                  </div>

                  <h3 className="font-serif text-xl group-hover:text-journal-gold transition-colors duration-300 text-journal-text leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-journal-text-secondary text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-journal-border/30 mt-6">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-journal-gold group-hover:text-journal-text transition-colors duration-300 font-medium"
                  >
                    <span>Read more</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Curated Edit Section */}
      <section className="py-20 md:py-28 bg-journal-bg-secondary/40 border-y border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
              Curated Edit
            </span>
            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">The Curated Edit</h2>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
            <p className="text-journal-text-secondary font-light text-sm md:text-base max-w-md mx-auto">
              Beauty, places, pieces, and little moments worth remembering.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Beauty", label: "Self-Care Rituals" },
              { name: "Cafés", label: "Quiet Corners" },
              { name: "Travel", label: "Slow Journeys" },
              { name: "Fashion", label: "Capsule Pieces" },
              { name: "Soft Living", label: "Slowing Down" },
              { name: "Brand Stories", label: "Intentional Design" }
            ].map((cat) => (
              <div 
                key={cat.name} 
                className="group flex flex-col p-6 bg-journal-card border border-journal-border hover:border-journal-champagne/50 hover:-translate-y-1 transition-all duration-300 text-center rounded-[2px]"
              >
                <div className="w-8 h-8 rounded-full bg-journal-bg flex items-center justify-center mx-auto mb-4 text-journal-gold group-hover:bg-journal-gold group-hover:text-journal-bg transition-colors duration-300 select-none">
                  <span className="font-serif text-xs">✦</span>
                </div>
                <h3 className="font-serif text-sm font-semibold text-journal-text group-hover:text-journal-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] tracking-wider uppercase text-journal-muted mt-2 block leading-snug">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full border border-journal-border hover:bg-journal-text hover:text-journal-bg transition-all uppercase tracking-widest text-[11px] h-11 px-8" asChild>
              <Link to="/lifestyle">
                Explore The Edit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Free Journal / Lead Magnet Section */}
      <section className="py-20 md:py-28 bg-journal-bg border-b border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8 border border-journal-border bg-journal-card p-8 md:p-12 rounded-[2px] shadow-sm">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Free Reflection Journal
            </span>

            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text leading-tight">
              A Soft Gift for Your Becoming
            </h2>

            <p className="text-journal-text-secondary font-sans leading-relaxed text-sm md:text-base font-light max-w-xl mx-auto">
              Download Notes on Becoming — a gentle reflection journal for women learning to slow down, let go, and return to themselves.
            </p>

            <div className="pt-2">
              <EmailSignupForm variant="compact" />
            </div>

            <div className="pt-4">
              <Link 
                to="/downloads" 
                className="text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
              >
                Learn more about the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Minimal Section */}
      <section className="py-16 md:py-20 bg-journal-bg">
        <div className="container mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
            Follow the Soft Notes
          </span>
          <p className="text-journal-text-secondary font-light text-sm md:text-base max-w-sm mx-auto">
            Small thoughts, quiet moments, and pieces of my becoming.
          </p>
          <div className="pt-2">
            <a
              href="https://instagram.com/missjooo98"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif text-xl md:text-2xl text-journal-text hover:text-journal-gold transition-colors duration-300 border-b border-journal-border/60 pb-1"
            >
              <span>Connect on Instagram</span>
              <span className="text-sm font-sans">→</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
