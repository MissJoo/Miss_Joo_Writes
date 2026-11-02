import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { editCategories } from "@/data/edit-categories";

const Lifestyle = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-journal-bg pt-24 pb-10 lg:pt-28 lg:pb-12">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Beauty · Places · Little Finds
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">
              The Edit
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-serif italic text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              A considered collection of beauty, places and the little finds that make everyday life feel softer.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="pb-16 lg:pb-24 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          {/* Four categories, each opening its category page. Photo shown whole (2:3), text over its lower part. */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {editCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/lifestyle/${category.slug}`}
                className="group relative block aspect-[2/3] overflow-hidden rounded-[3px] border border-journal-border bg-journal-card shadow-sm transition-colors duration-300 hover:border-journal-champagne/60"
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 pb-7 pt-24 md:px-8 md:pb-8 space-y-3">
                  <h2 className="font-serif text-2xl md:text-3xl leading-snug text-[#f3e9dc]">{category.name}</h2>
                  <p className="font-sans text-sm font-light leading-relaxed text-[#f3e9dc]/85">{category.cardText}</p>
                  <span aria-hidden="true" className="block font-sans text-lg text-journal-champagne transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
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
