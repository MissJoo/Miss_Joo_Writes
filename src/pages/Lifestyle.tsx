import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import maisonImage from "@/assets/MaisondeBeauteSalon.jpg";
import { Instagram } from "lucide-react";

const Lifestyle = () => {
  const edits = [
    {
      category: "Beauty",
      title: "Maison de Beauté Salon",
      subtitle: "A quiet kind of self-care",
      excerpt: "Some places don't just offer a service — they offer a feeling. Maison de Beauté feels like one of those spaces where time slows down. Use my exclusive code MDB_MJ10 for 10% off.",
      linkText: "Read the story",
      hasImage: true,
    },
    {
      category: "Cafés",
      title: "Quiet Corners",
      subtitle: "Warm light and ceramics",
      excerpt: "The small, satisfying ritual of choosing a corner table, ordering a black coffee, and watching the city wake up slowly through glass.",
      hasImage: false,
      quote: "“Simple pleasures require no justification.”",
    },
    {
      category: "Travel",
      title: "Slow Journeys",
      subtitle: "Walking without a map",
      excerpt: "Notes on leaving early, choosing train rides over flights, and learning the art of arriving in a new place without a rigid itinerary.",
      hasImage: false,
      quote: "“Travel returns us to our senses.”",
    },
    {
      category: "Fashion",
      title: "Capsule Pieces",
      subtitle: "Investing in longevity",
      excerpt: "A curation of soft linens, tailored wool coats, and items that feel like shelter. Pieces made to last and tell a quiet, elegant story.",
      hasImage: false,
      quote: "“Simplicity is the ultimate sophistication.”",
    },
    {
      category: "Soft Living",
      title: "Slowing Down",
      subtitle: "Living with intention",
      excerpt: "Choosing not to rush. Creating morning spaces, setting gentle boundaries, and learning how to exist without performing productivity.",
      hasImage: false,
      quote: "“Rest is an active form of healing.”",
    },
    {
      category: "Brand Stories",
      title: "Intentional Design",
      subtitle: "The beauty of craft",
      excerpt: "Highlighting independent makers who shape clay, spin linen, and bind paper with patience and a deep respect for the material.",
      hasImage: false,
      quote: "“Objects hold the care of their creators.”",
    },
  ];

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
            {edits.map((item, index) => (
              <article 
                key={index} 
                className="group flex flex-col justify-between border border-journal-border bg-journal-card hover:border-journal-champagne/60 hover:-translate-y-1 transition-all duration-300 rounded-[2px] shadow-sm overflow-hidden"
              >
                <div>
                  {/* Visual Top Block */}
                  {item.hasImage ? (
                    <div className="aspect-[3/2] overflow-hidden bg-journal-bg border-b border-journal-border/50">
                      <img 
                        src={maisonImage} 
                        alt="Maison de Beauté" 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/2] bg-journal-bg-secondary/40 flex items-center justify-center p-6 border-b border-journal-border/50 select-none text-center">
                      <div className="space-y-2">
                        <span className="text-base text-journal-champagne block">✦</span>
                        <p className="font-serif italic text-sm text-journal-text-secondary px-4">
                          {item.quote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Info */}
                  <div className="p-6 space-y-3">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-journal-gold font-medium block">
                      {item.category}
                    </span>
                    <h2 className="font-serif text-lg font-medium text-journal-text">
                      {item.title}
                    </h2>
                    <h3 className="font-serif italic text-xs text-journal-muted">
                      {item.subtitle}
                    </h3>
                    <p className="text-journal-text-secondary font-sans text-xs md:text-sm font-light leading-relaxed pt-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer link/action if applicable */}
                {item.category === "Beauty" && (
                  <div className="p-6 pt-0 mt-2 border-t border-journal-border/20">
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
                    >
                      <span>Inquire / Collaborate</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </article>
            ))}
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
