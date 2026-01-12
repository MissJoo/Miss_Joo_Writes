import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import maisonImage from "@/assets/maison-de-beaute.jpg";

const SharedExperiences = () => {
  return (
    <Layout>
      <div className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Page Header */}
          <header className="mb-16 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8 tracking-tight">
              Shared Experiences
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
              <p>
                This page is a collection of brands and spaces I genuinely connect with.
              </p>
              <p>
                Every collaboration shared here is based on real experiences — places I've visited, 
                services I've tried, and moments that felt aligned with my lifestyle and values.
              </p>
              <p className="text-foreground/70">
                I don't share everything.<br />
                Only what feels honest.
              </p>
            </div>
          </header>

          <Separator className="mb-16 bg-border/40" />

          {/* First Feature */}
          <article className="mb-20">
            {/* Feature Image */}
            <div className="mb-10 -mx-6 md:mx-0">
              <img 
                src={maisonImage} 
                alt="Maison de Beauté Salon interior - a serene beauty space with soft natural lighting and elegant decor"
                className="w-full h-64 md:h-80 object-cover md:rounded-sm"
              />
            </div>

            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-sans">
                Feature
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mt-3 mb-2">
                Maison de Beauté Salon
              </h2>
              <p className="font-serif text-lg text-muted-foreground italic">
                A quiet kind of self-care
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-6 text-muted-foreground leading-relaxed font-light">
                <p>
                  Some places don't just offer a service — they offer a feeling.
                </p>
                <p>
                  Maison de Beauté Salon feels like one of those spaces where time slows down the moment you walk in.
                  From the calm atmosphere to the attention to detail, everything feels intentional — never rushed.
                </p>
                <p>
                  What stood out to me most was how comfortable the experience felt.
                  Not overwhelming.
                  Not loud.
                  Just calm, clean, and thoughtfully curated.
                </p>
                <p>
                  It wasn't just about beauty treatments — it was about taking a pause.
                  About allowing yourself to be taken care of without needing to explain or hurry.
                </p>
                <p>
                  The team was warm, professional, and attentive in a way that made the experience feel personal rather than transactional.
                  You leave not only looking refreshed, but feeling lighter.
                </p>
                <p>
                  Maison de Beauté is the kind of place you go to when you want to reconnect with yourself — quietly.
                </p>
                <p>
                  And honestly, that's the kind of luxury I appreciate most.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-border/30">
                <p className="font-serif text-foreground/80 italic text-center">
                  This felt like a moment of softness I didn't know I needed.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default SharedExperiences;
