import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-image.jpg";

// Sample blog posts data
const blogPosts = [
  {
    title: "January taught me to slow down",
    excerpt: "Not moving was the honest thing I could do....",
    date: "January 27, 2026",
    category: "Healing",
    slug: "slow-down",
    featured: true,
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Atmospheric texture"
            className="w-full h-full object-cover opacity-50 contrast-125 saturate-50" // Luxury image treatment
          />
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl commercial-title animate-fade-in-up text-balance leading-[1.1]">
              <span className="block text-foreground tracking-tight">The Art of</span>
              <span className="block italic font-light text-muted-foreground mt-2">Living Slowly</span>
            </h1>

            <p className="text-balance text-muted-foreground text-lg md:text-xl font-sans tracking-wide animate-fade-in-delay-1 max-w-lg mx-auto leading-relaxed">
              A digital sanctuary for thoughts that linger, stories that heal, and the beauty found in quiet moments.
            </p>

            <div className="animate-fade-in-delay-2 pt-8">
              <Button variant="outline" size="lg" className="rounded-none border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground tracking-[0.2em] uppercase text-xs px-8 py-6 transition-all duration-500" asChild>
                <Link to="/blog">
                  Enter the Journal
                </Link>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delay-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block animate-pulse">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* About Section - Editorial Style */}
      <section className="py-24 md:py-32 bg-background border-b border-border/40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">The Author</span>

              <h2 className="font-serif text-3xl md:text-5xl leading-tight">
                Embracing the <br />
                <span className="italic font-light text-muted-foreground">art of slowing down.</span>
              </h2>

              <p className="text-muted-foreground font-sans leading-relaxed text-lg font-light">
                This space is a curator of moments—the messy, the beautiful, and the quiet ones in between.
                I write to explore what it means to heal, to grow, and to simply exist with intention.
              </p>

              <Button variant="link" className="p-0 h-auto text-foreground hover:text-primary transition-colors text-xs tracking-widest uppercase border-b border-foreground/30 pb-1 rounded-none hover:no-underline" asChild>
                <Link to="/about">
                  Read My Story
                </Link>
              </Button>
            </div>
            {/* Decorative element or simple image placeholder could go here if requested, but keeping text focused for now */}
          </div>
        </div>
      </section>

      {/* Blog Preview Section - Minimal Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-16 border-b border-border/40 pb-6">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Journal Entries</h2>
            <Link to="/blog" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div
                key={post.slug}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 bg-secondary/20 aspect-[4/5]">
                  {/* Placeholder for post image if we had them, or just a nice colored block */}
                  <div className="w-full h-full bg-secondary/10 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block">
                    {post.category} — {post.date}
                  </span>

                  <h3 className="font-serif text-2xl group-hover:text-primary transition-colors duration-300">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
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
