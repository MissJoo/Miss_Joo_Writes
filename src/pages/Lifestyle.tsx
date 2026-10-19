import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { curatedEdit } from "@/data/curated-edit";
import { publicFileExists } from "@/lib/publicFiles";

/** Internal paths use the router; anything else opens in a new tab. */
const SmartLink = ({ to, className, children }: { to: string; className?: string; children: ReactNode }) =>
  to.startsWith("/") ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );

const Lifestyle = () => {
  // Card content lives in src/data/curated-edit.ts
  const edits = curatedEdit;

  return (
    <Layout>
      {/* Page Header */}
      <section className="flex min-h-[calc(100svh-85px)] items-center border-b border-journal-border/30 bg-journal-bg py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Curated Collections
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">
              The Curated Edit
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
              Beauty, places, pieces, and little moments worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16 lg:py-24 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {edits.map((item) => {
              // A pick's photo (once it exists in public/) replaces the card's own image
              const pickImage = publicFileExists(item.pick?.image) ? item.pick?.image : undefined;
              const image = pickImage
                ? { src: pickImage, alt: item.pick!.name, width: 1200, height: 800 }
                : item.image;
              const quote = <>&ldquo;{item.quote}&rdquo;</>;
              const quoteText = item.quoteLink ? (
                <SmartLink to={item.quoteLink} className="hover:text-journal-gold transition-colors underline decoration-journal-champagne/40 underline-offset-4">
                  {quote}
                </SmartLink>
              ) : (
                quote
              );
              return (
              <article 
                key={item.category} 
                className="group flex flex-col justify-between border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-1 transition-all duration-300 rounded-[2px] shadow-sm overflow-hidden"
              >
                <div>
                  {/* Visual Top Block */}
                  {image ? (
                    <div className="aspect-[3/2] overflow-hidden bg-journal-bg border-b border-journal-border/50">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/2] bg-journal-bg-secondary/40 flex items-center justify-center p-6 border-b border-journal-border/50 text-center">
                      <div className="space-y-2">
                        <span className="text-base text-journal-champagne block select-none" aria-hidden="true">✦</span>
                        <p className="font-serif italic text-sm text-journal-text-secondary px-4">
                          {quoteText}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Info */}
                  <div className="p-6 space-y-3">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-journal-gold font-medium block">
                      {item.category}
                    </span>
                    {item.title ? (
                      <>
                        <h2 className="font-serif text-lg font-medium text-journal-text">
                          {item.title}
                        </h2>
                        <h3 className="font-serif italic text-xs text-journal-muted">
                          {item.subtitle}
                        </h3>
                      </>
                    ) : (
                      <h2 className="font-serif text-lg font-medium text-journal-text">
                        {item.subtitle}
                      </h2>
                    )}
                    <p className="text-journal-text-secondary font-sans text-xs md:text-sm font-light leading-relaxed pt-2">
                      {item.text}
                    </p>
                    {item.note && (
                      <p className="font-serif italic text-xs text-journal-muted">{item.note}</p>
                    )}
                    {item.pick ? (
                      <p className="text-xs text-journal-text-secondary font-sans pt-1">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-journal-gold font-medium mr-2">This month</span>
                        {item.pick.link ? (
                          <SmartLink to={item.pick.link} className="font-serif text-sm text-journal-text hover:text-journal-gold transition-colors">
                            {item.pick.name} <span aria-hidden="true">→</span>
                          </SmartLink>
                        ) : (
                          <span className="font-serif text-sm text-journal-text">{item.pick.name}</span>
                        )}
                        {item.pick.detail && <span className="block mt-1 font-light">{item.pick.detail}</span>}
                      </p>
                    ) : (
                      item.emptyNote && <p className="font-serif italic text-xs text-journal-muted">{item.emptyNote}</p>
                    )}
                    {/* With a photo on top, the quote moves under the text */}
                    {image && (
                      <p className="font-serif italic text-sm text-journal-text-secondary pt-1">{quoteText}</p>
                    )}
                  </div>
                </div>

                {item.button && (
                  <div className="p-6 pt-0 mt-2 border-t border-journal-border/20">
                    <Link 
                      to={item.button.to} 
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
                    >
                      <span>{item.button.text}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </article>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-20 p-8 border border-journal-border bg-journal-card rounded-[2px] space-y-4">
            <h3 className="font-serif text-xl text-journal-text">Would you like to share a story?</h3>
            <p className="text-journal-text-secondary text-xs md:text-sm font-light max-w-md mx-auto leading-relaxed">
              I collaborate with brands, spaces, and makers who believe in quality, beauty, and slow living.
            </p>
            <div className="pt-2">
              <Button variant="outline" className="rounded-full border border-journal-border hover:bg-journal-text hover:text-journal-bg transition-all uppercase tracking-widest text-[11px] h-10 px-8" asChild>
                <Link to="/contact">
                  Let's Collaborate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lifestyle;
