import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PostcardCard, { readPostcardLink } from "@/components/home/PostcardCard";
import { postcard } from "@/data/quiz";

/** Where a shared postcard link lands: the same card, then a way into the Suitcase. */
const SharedPostcard = () => {
  // Read after load, so the prerendered page (built with no link) never clashes with the visitor's link
  const [card, setCard] = useState<ReturnType<typeof readPostcardLink> | null>(null);
  useEffect(() => setCard(readPostcardLink(window.location.search)), []);

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.35em] uppercase text-journal-gold font-sans font-medium block">
              {postcard.label}
            </span>
            <h1 className="mt-4 font-serif text-2xl md:text-3.5xl text-journal-text">{postcard.signoff}</h1>
            <div className="mt-8 min-h-[420px] sm:min-h-[260px]">
              {card && (
                <PostcardCard name={card.name} from={card.from} message={card.message} note={card.note}>
                  <Link
                    to="/the-suitcase"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors duration-300"
                  >
                    <span>{postcard.sharedButton}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </PostcardCard>
              )}
            </div>
            <Link
              to="/"
              className="mt-8 inline-block text-xs tracking-wider uppercase text-journal-gold hover:text-journal-text underline underline-offset-4 decoration-journal-champagne font-sans font-medium py-2 transition-colors duration-300"
            >
              {postcard.sharedMake}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SharedPostcard;
