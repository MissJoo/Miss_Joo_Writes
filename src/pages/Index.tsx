import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import heroImage from "@/assets/hero-image.webp";
import FromTheFeed from "@/components/FromTheFeed";
import ReadByMood from "@/components/ReadByMood";
import TodaysNote from "@/components/home/TodaysNote";
import WeeklyLetter from "@/components/home/WeeklyLetter";
import QuizAndPostcard from "@/components/home/QuizAndPostcard";
import { SuitcaseHomeTeaser } from "@/components/suitcase/SuitcaseTeasers";
import { posts, readingTime } from "@/data/posts";
import { moodPortrait } from "@/data/moods";
import { publicFileExists } from "@/lib/publicFiles";
import { topicLabel } from "@/data/pillars";

const blogPosts = posts;

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-journal-bg">
        {/* Soft Background Texture Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={heroImage}
            alt=""
            width={1600}
            height={900}
            {...{ fetchpriority: "high" }}
            className="w-full h-full object-cover opacity-[0.06] contrast-75 saturate-0 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-journal-bg/30 to-journal-bg"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="font-serif text-[34px] md:text-[56px] leading-[1.15] text-journal-text animate-fade-in-up tracking-tight max-w-2xl mx-auto">
              For the thoughts we never posted, but still needed to feel.
            </h1>

            <div className="w-16 h-[1px] bg-journal-champagne/60 mx-auto my-6"></div>

            <p className="text-journal-text-secondary text-base md:text-lg font-sans font-light tracking-wide max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
              A soft editorial on womanhood, healing, growth, career, love, becoming, and the quiet moments that shape us.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-delay-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-gold text-espresso hover:bg-gold-hover hover:text-espresso border-none tracking-widest uppercase text-[11px] px-8 py-5 transition-all duration-300 shadow-sm"
                asChild
              >
                <Link to="/blog">
                  Enter the Journal
                </Link>
              </Button>
              <Link 
                to={`/blog/${blogPosts[0].slug}`} 
                className="text-journal-gold hover:text-journal-text text-xs tracking-wider uppercase underline underline-offset-4 decoration-journal-champagne font-sans font-medium py-2 transition-colors duration-300"
              >
                Read the latest reflection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReadByMood />

      <TodaysNote />

      {/* About Preview Section */}
      <section className="py-20 md:py-28 bg-journal-bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">About Me</h2>

            <p className="text-journal-text-secondary font-sans leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto">
              Miss Joo Writes is my quiet corner of the internet, a space for the thoughts that feel too layered for captions and too meaningful to disappear in the scroll. Here, I write about womanhood, growth, career, and what it means to build a life far from home. And the small moments too, the ones that teach us how to return to ourselves.
            </p>

            {publicFileExists(moodPortrait.src) && (
              <figure className="mx-auto w-[min(300px,80%)]">
                <img
                  src={moodPortrait.src}
                  alt="Miss Joo"
                  width={600}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover rounded-[3px] border border-journal-border shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10)]"
                />
                <figcaption className="mt-4 font-serif italic text-lg text-journal-text-secondary leading-relaxed">
                  {moodPortrait.caption}
                </figcaption>
              </figure>
            )}

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
          <div className="flex flex-col items-center text-center mb-12 border-b border-journal-border/50 pb-5">
            <div>
              <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">Latest from the Journal</h2>
              <p className="text-[11px] text-journal-muted tracking-widest uppercase mt-1">Reflections and quiet lessons</p>
            </div>
            <Link 
              to="/blog" 
              className="text-xs tracking-[0.2em] uppercase text-journal-gold hover:text-journal-text transition-colors mt-3 font-medium"
            >
              View All Entries
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col justify-between p-6 border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-[3px] transition-all duration-300 rounded-[3px] shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_-8px_rgba(139,106,67,0.22),0_4px_16px_-4px_rgba(0,0,0,0.07)] overflow-hidden"
              >
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] uppercase text-journal-muted">
                    <span>{topicLabel(post.pillar)}</span>
                    <span className="w-4 h-px bg-journal-border"></span>
                    <time dateTime={post.datePublished}>{post.date}</time>
                    <span className="w-4 h-px bg-journal-border"></span>
                    <span>{readingTime(post)}</span>
                  </div>

                  <h3 className="font-serif text-xl group-hover:text-journal-gold transition-colors duration-300 text-journal-text leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-journal-text-secondary text-sm font-light leading-relaxed line-clamp-3">
                    {post.cliffhanger || post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-journal-border/30 mt-6 text-center">
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

      <SuitcaseHomeTeaser />

      <WeeklyLetter />

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
            <Button variant="outline" className="rounded-full border border-journal-border hover:bg-gold hover:border-gold hover:text-espresso transition-all uppercase tracking-widest text-[11px] h-11 px-8" asChild>
              <Link to="/lifestyle">
                Explore The Edit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FromTheFeed />

      {/* Free Journal / Lead Magnet Section */}
      <section className="pt-10 pb-14 md:pt-12 md:pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8 border border-journal-border bg-journal-card p-8 md:p-12 rounded-[2px] shadow-sm">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Free Reflection Journal
            </span>

            <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text leading-tight">
              A Soft Gift for Your Becoming
            </h2>

            <p className="text-journal-text-secondary font-sans leading-relaxed text-sm md:text-base font-light max-w-xl mx-auto">
              Download Notes on Becoming, a gentle reflection journal for women learning to slow down, let go, and return to themselves.
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

      <QuizAndPostcard />
    </Layout>
  );
};

export default Index;
