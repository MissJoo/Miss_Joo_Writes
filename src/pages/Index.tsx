import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-image.webp";
import FromTheFeed from "@/components/FromTheFeed";
import ReadByMood from "@/components/ReadByMood";
import NewsletterSignup from "@/components/NewsletterSignup";
import { PostcardPopup, QuizLine } from "@/components/home/QuizAndPostcard";
import { SuitcaseHomeTeaser, homeSection, homeText } from "@/components/suitcase/SuitcaseTeasers";
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
            <span className="block text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium animate-fade-in [text-wrap:balance]">
              Essays on womanhood, healing and self-discovery
            </span>
            <h1 className="font-serif text-[34px] md:text-[56px] leading-[1.15] text-journal-text animate-fade-in-up tracking-tight max-w-2xl mx-auto">
              For the thoughts we never posted, but still needed to feel.
            </h1>

            <div className="w-16 h-[1px] bg-journal-champagne/60 mx-auto my-6"></div>

            <p className="text-journal-text-secondary text-base md:text-lg font-sans font-light tracking-wide max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
              I started this journal for the questions I could not say out loud. Start with one entry, or let your mood choose.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-delay-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-gold text-espresso hover:bg-gold-hover hover:text-espresso border-none tracking-widest uppercase text-[11px] px-8 py-5 transition-all duration-300 shadow-sm"
                asChild
              >
                <Link to="/blog">
                  Read the Journal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ReadByMood />

      <SuitcaseHomeTeaser>
        <QuizLine />
      </SuitcaseHomeTeaser>

      {/* Latest Journal Entries Section */}
      <section className={homeSection}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto mb-5 md:mb-8 flex max-w-6xl items-end justify-between gap-6">
            <div>
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium">Latest from the Journal</h2>
              <p className="hidden md:block mt-3 font-serif text-2xl md:text-3.5xl text-journal-text">Reflections and quiet lessons</p>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline shrink-0 text-xs text-journal-gold underline underline-offset-4 hover:text-journal-text transition-colors"
            >
              View all entries →
            </Link>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-6">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article
                key={post.slug}
                className={`group relative flex-col p-6 border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-[3px] transition-all duration-300 rounded-xl shadow-[0_2px_12px_-4px_rgba(139,106,67,0.10),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_-8px_rgba(139,106,67,0.22),0_4px_16px_-4px_rgba(0,0,0,0.07)] overflow-hidden ${index === 2 ? "hidden md:flex" : "flex"}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-journal-gold">{topicLabel(post.pillar)}</span>
                    {index === 0 && (
                      <span className="rounded-full bg-journal-gold px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-journal-bg">New</span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl group-hover:text-journal-gold transition-colors duration-300 text-journal-text leading-snug">
                    {/* The whole card is the link */}
                    <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
                  </h3>

                  <p className="hidden md:block text-journal-text-secondary text-sm font-light leading-relaxed line-clamp-3">
                    {post.cliffhanger || post.excerpt}
                  </p>

                  <p className="text-xs font-light text-journal-muted">
                    <time dateTime={post.datePublished}>{post.date}</time> · {readingTime(post)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Letter, then the postcard line under it */}
      <section className={homeSection}>
        <div className="container mx-auto px-6 lg:px-12">
          <NewsletterSignup
            source="homepage"
            split
            className="max-w-5xl"
            description={
              <>
                <span className="md:hidden">One letter when a new essay is ready, plus a welcome letter with a free postcard.</span>
                <span className="hidden md:block">One letter when a new essay is ready</span>
                <span className="hidden md:block">A welcome letter with a free postcard</span>
                <span className="hidden md:block">Unsubscribe any time</span>
              </>
            }
          />
          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-2 border-y border-journal-border/50 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm font-light text-journal-text-secondary">Miss someone far away? Send a free postcard.</p>
            <PostcardPopup>Create a postcard →</PostcardPopup>
          </div>
        </div>
      </section>

      <FromTheFeed />

      {/* This Week's Letter (the envelope) is hidden for now. To show it again, put <WeeklyLetter /> back here
          and its import back at the top: import WeeklyLetter from "@/components/home/WeeklyLetter"; */}

      {/* The Edit Section: text above, photo filling the width below */}
      <section aria-labelledby="the-edit-title" className={homeSection}>
        <div className="container mx-auto px-6 lg:px-12">
          {/* The box is always dark (the photo's wall colour), so these colours stay the same in light mode */}
          <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-journal-border" style={{ backgroundColor: "#2b190d" }}>
            <div className="space-y-5 px-6 py-10 text-center md:py-12">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#ddb56c] font-sans font-medium block">
                Beauty · Places · Little Finds
              </span>
              <h2 id="the-edit-title" className="font-serif text-2xl md:text-3.5xl text-[#f3e9dc]">
                The Edit
              </h2>
              <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
              <p className={`text-[#d9c7b3] font-light text-sm md:text-base ${homeText}`}>
                A considered collection of places, discoveries and little things that make everyday life feel more beautiful.
              </p>
              <div className="pt-2">
                <Link
                  to="/lifestyle"
                  className="inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journal-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-journal-bg"
                >
                  Explore The Edit
                </Link>
              </div>
            </div>
            <img
              src="/assets/home/the-edit-bg.webp"
              alt=""
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
              className="block aspect-[3/2] w-full object-cover object-bottom md:aspect-[21/9]"
            />
          </div>
        </div>
      </section>

      {/* About Preview Section: photo left and text right from tablets up, stacked on phones */}
      <section className="py-10 lg:py-20 bg-journal-bg-secondary border-t border-journal-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`max-w-5xl mx-auto grid gap-8 items-center ${publicFileExists(moodPortrait.src) ? "md:grid-cols-[295px_1fr] md:gap-14" : ""}`}>
            {publicFileExists(moodPortrait.src) && (
              <img
                src={moodPortrait.src}
                alt="Miss Joo"
                width={600}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[320px] md:max-w-none aspect-[4/5] object-cover rounded-xl border border-journal-border"
              />
            )}

            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
                About Miss Joo
              </span>
              <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text">Hi, I&rsquo;m Joo.</h2>
              <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light leading-relaxed">
                I created this space for the thoughts, feelings and small moments that often go unspoken. Some stories come
                from my own life experience; others are thoughts I hope you recognise in your own.
              </p>
              <div className="pt-1">
                <Link
                  to="/about"
                  className="inline-flex h-11 items-center rounded-full border border-journal-gold px-8 text-[11px] uppercase tracking-widest text-journal-gold hover:text-journal-text hover:border-journal-text transition-colors duration-300"
                >
                  Read My Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
