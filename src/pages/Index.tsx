import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Instagram } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import heroImage from "@/assets/hero-image.jpg";

// Sample blog posts data
const blogPosts = [
  {
     title: "Welcoming 2026 with an open heart",
    excerpt: "Closing old chapters, opening new beginnings....",
    date: "December 31, 2025",
    category: "Life",
    slug: "new-beginnings",
    featured: true,
  },
  { 
    title: "Some days I'm strong, some days I'm just tired",
    excerpt: "I’ve learned that strength doesn’t always look loud. Some days, it’s simply getting through the day without explaining why you feel heavy....",
    date: "December 30, 2025",
    category: "Healing",
    slug: "strong-days",
    featured: true,
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight animate-fade-in-up text-balance">
              <span className="italic text-dusty-rose">Some stories</span>
              <br />
              are meant to be felt,
              <br />
              <span className="text-muted-foreground">not just read.</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl font-sans animate-fade-in-delay-1 max-w-xl mx-auto">
              A digital journal for the thoughts that need more than a caption.
            </p>

            <div className="animate-fade-in-delay-2 pt-4">
              <Button variant="journal" size="journal" asChild>
                <Link to="/blog" className="text-base tracking-wide">
                  Read the journal
                </Link>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delay-3">
            <ArrowDown className="w-5 h-5 text-muted-foreground animate-gentle-float" />
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-section bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">About</span>
            
            <h2 className="font-serif text-3xl md:text-4xl leading-relaxed">
              I write because some feelings 
              <span className="italic text-dusty-rose"> deserve more </span> 
              than a fleeting moment.
            </h2>

            <p className="text-muted-foreground font-sans leading-relaxed">
              This is a space for reflection, for the messy and beautiful parts of life, 
              for the thoughts that linger long after the moment has passed. 
              Here, I share my journey through healing, growing, and simply being human.
            </p>

            <Button variant="journal" size="journal" asChild>
              <Link to="/about" className="text-sm">
                Learn more about me
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-section">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 lg:mb-16">
            <div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Latest</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-2">From the journal</h2>
            </div>
            <Button variant="journal" size="journal" asChild>
              <Link to="/blog" className="text-sm">
                View all entries
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {blogPosts.map((post, index) => (
              <div 
                key={post.slug}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                <BlogPostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Connection Section */}
      <section className="py-section bg-warm-beige/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <Instagram className="w-8 h-8 mx-auto text-muted-foreground" />
            
            <h2 className="font-serif text-2xl md:text-3xl">
              The visual stories live on Instagram.
              <br />
              <span className="text-muted-foreground">The written ones live here.</span>
            </h2>

            <a
              href="https://instagram.com/missjooo98"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <span className="text-lg tracking-wide">@missjooo98</span>
              <span className="w-8 h-px bg-foreground/50 group-hover:w-12 transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
