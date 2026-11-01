import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { editCategories } from "@/data/edit-categories";

const Lifestyle = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="flex min-h-[calc(100svh-85px)] items-center border-b border-journal-border/30 bg-journal-bg py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Beauty · Places · Little Finds
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">
              The Edit
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
              Beauty, places, and the little finds that make ordinary days feel softer.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 lg:py-24 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          {/* Four categories: each photo shown whole (2:3), its text over the lower part on a soft dark fade */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {editCategories.map((category) => (
              <article
                key={category.name}
                className="relative aspect-[2/3] overflow-hidden rounded-[3px] border border-journal-border bg-journal-card shadow-sm"
              >
                <img
                  src={category.image.src}
                  alt={category.image.alt}
                  width={900}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 pb-7 pt-28 md:px-8 md:pb-8 space-y-3">
                  <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-champagne">
                    {category.number} · {category.name}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl leading-snug text-[#f3e9dc]">{category.headline}</h2>
                  <p className="font-sans text-sm font-light leading-relaxed text-[#f3e9dc]/85">{category.text}</p>
                  {category.tag && (
                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-journal-champagne">{category.tag}</p>
                  )}
                  <p className="font-serif italic text-base md:text-lg text-[#f3e9dc]">&ldquo;{category.quote}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-20 p-8 border border-journal-border bg-journal-card rounded-[2px] space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Brands &amp; Makers
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-journal-text">Made something with intention?</h3>
            <p className="text-journal-text-secondary text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
              I love discovering and collaborating with brands, spaces and makers who value quality, beauty and thoughtful
              living. If that sounds like you, I&rsquo;d love to hear your story.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lifestyle;
