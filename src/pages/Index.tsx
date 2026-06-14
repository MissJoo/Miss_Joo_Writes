import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import heroImage from "@/assets/hero-image.jpg";
import { date } from "zod";

// Sample blog posts data
const blogPosts = [
  {
    title: "There is a difference between fighting for love and forcing it",
    excerpt: "But sometimes, when you care deeply about someone, the difference becomes hard to see.",
    date: "June 12, 2026",
    category: "Thoughts",
    slug: "fighting-vs-forcing-love",
    featured: true,
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
      {/* Featured Blog Post - Matching the Sample Layout */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Featured Post */}
              <article className="group">
                {/* Featured Image */}
                <div className="overflow-hidden mb-8">
                  <img 
                    src={heroImage} 
                    alt="A slow morning scene" 
                    className="w-full h-auto max-h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* Post Title */}
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                  <Link to={`/blog/${blogPosts[0].slug}`} className="hover:text-primary transition-colors duration-300">
                    {blogPosts[0].title}
                  </Link>
                </h2>

                {/* Post Meta */}
                <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-6">
                  <span>Written by Joo</span>
                  <span>|</span>
                  <time>{blogPosts[0].date}</time>
                  <span>|</span>
                  <span>{blogPosts[0].category}</span>
                </div>

                {/* Excerpt */}
                <p className="text-foreground font-sans leading-relaxed text-base mb-6">
                  {blogPosts[0].excerpt}
                </p>

                {/* Read More */}
                <Link 
                  to={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors group/link"
                >
                  <span>Continue Reading</span>
                  <span className="w-6 h-[1px] bg-muted-foreground group-hover/link:w-10 group-hover/link:bg-foreground transition-all duration-300"></span>
                </Link>
              </article>

              {/* Divider */}
              <div className="my-16 border-t border-border/50"></div>

              {/* More Recent Entries */}
              <div className="space-y-12">
                <h3 className="font-serif text-2xl text-foreground">Recent Entries</h3>
                {blogPosts.slice(1, 4).map((post) => (
                  <article 
                    key={post.slug}
                    className="group flex flex-col md:flex-row gap-6 pb-10 border-b border-border/30"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                        <span>{post.category}</span>
                        <span>—</span>
                        <time>{post.date}</time>
                      </div>
                      <h4 className="font-serif text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light font-sans">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}

                {/* View All Link */}
                <div className="pt-4 text-center">
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
                  >
                    <span className="w-8 h-[1px] bg-border/60"></span>
                    View All Journal Entries
                    <span className="w-8 h-[1px] bg-border/60"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              {/* Cursive Quote */}
              <div className="text-center py-8">
                <p className="font-signature text-3xl lg:text-4xl text-foreground/70 leading-relaxed">
                  Seek beauty<br />in the subtle.
                </p>
              </div>

              {/* Author Photo Placeholder */}
              <div className="border border-border/50 p-3">
                <div className="bg-secondary/30 aspect-square flex items-center justify-center">
                  <span className="font-serif text-lg text-muted-foreground italic">Joo</span>
                </div>
              </div>

              {/* Subscription Form */}
              <div className="text-center space-y-4">
                <h4 className="font-serif text-lg text-foreground">Subscription form</h4>
                <EmailSignupForm variant="compact" />
              </div>

              {/* Divider */}
              <div className="border-t border-border/40"></div>

              {/* About Blurb */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-foreground">About Miss Joo</h4>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  This space is a curator of moments—the messy, the beautiful, and the quiet ones in between.
                  I write to explore what it means to heal, to grow, and to simply exist with intention.
                </p>
                <Link 
                  to="/about"
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Read My Story →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Shared Experiences - Feature Block */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="order-2 md:order-1 space-y-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Curated</span>

              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Shared <span className="italic font-light text-muted-foreground">Experiences</span>
              </h2>

              <p className="text-muted-foreground font-light text-lg leading-relaxed">
                A collection of places, brands, and moments that align with a slower, more intentional way of living.
                Genuine connections, rooted in real experiences.
              </p>

              <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all uppercase tracking-widest text-xs h-12 px-8" asChild>
                <Link to="/shared-experiences">
                  Explore
                </Link>
              </Button>
            </div>

            <div className="order-1 md:order-2 aspect-square bg-white/50 p-8 flex items-center justify-center border border-border/50">
              {/* Abstract visual or quote */}
              <div className="text-center space-y-4">
                <div className="w-16 h-[1px] bg-primary mx-auto"></div>
                <p className="font-serif italic text-2xl text-muted-foreground">"Connection is the energy that exists between people when they feel seen, heard, and valued."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup / Downloads Promotion */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background border-y border-border/40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Free Download</span>

            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              Get Your Free
              <span className="block italic font-light text-muted-foreground mt-2">Reflection Journal</span>
            </h2>

            <p className="text-muted-foreground font-sans leading-relaxed text-lg font-light max-w-xl mx-auto">
              Notes on Becoming — January. A gentle guide for anyone learning to move slower and trust what's unfolding.
            </p>

            <div className="pt-4">
              <EmailSignupForm variant="compact" />
            </div>

            <Button variant="link" className="p-0 h-auto text-foreground hover:text-primary transition-colors text-xs tracking-widest uppercase border-b border-foreground/30 pb-1 rounded-none hover:no-underline" asChild>
              <Link to="/downloads">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Minimal */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6 text-center space-y-8">
          <Instagram className="w-6 h-6 mx-auto text-foreground/60" />
          <a
            href="https://instagram.com/missjooo98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-serif text-3xl md:text-4xl hover:text-primary transition-colors duration-300"
          >
            @missjooo98
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
