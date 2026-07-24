import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="flex min-h-[calc(100svh-85px)] items-center bg-journal-bg py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block animate-fade-in">
              The Author
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text animate-fade-in-up">
              Hello, I'm <span className="font-signature text-journal-gold font-normal not-italic tracking-normal text-3.5xl md:text-5xl block sm:inline mt-1 sm:mt-0">Joo</span>
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-6 text-journal-text-secondary leading-[1.8] font-sans text-[17px] md:text-[18px] font-light text-left">
            <p className="font-serif italic text-lg md:text-xl text-journal-text text-center border-b border-journal-border/30 pb-8 mb-8">
              “I created Miss Joo Writes because some feelings do not fit inside an Instagram caption.”
            </p>

            <p>
              Some thoughts need more space.<br />
              Some emotions need time before they make sense.<br />
              Some stories are too personal to be rushed, too layered to be posted and forgotten in a few seconds.
            </p>

            <p>
              For a long time, I carried so many things quietly — the lessons, heartbreaks, overthinking, growth, soft moments, heavy nights, and the kind of feelings I did not always know how to explain. Writing became the place where I could finally let them breathe.
            </p>

            <p className="font-medium text-journal-text">
              This space is my personal journal on the internet.
            </p>

            <p>
              It is where I write about becoming, healing, letting go, self-worth, love, silence, softness, and the small realizations that change us slowly. Not because I have everything figured out, but because I am still learning too.
            </p>

            <p className="border-l-[2px] border-journal-champagne pl-6 my-8 font-serif italic text-lg md:text-xl text-journal-gold leading-relaxed">
              I write for the version of me who felt too much.<br />
              The version of me who stayed longer than she should have.<br />
              The version of me who kept trying to understand everything.<br />
              And the version of me who is finally learning that peace matters too.
            </p>

            <p>
              Miss Joo Writes is not about perfect healing. It is about honest healing.
            </p>

            <p>
              The kind that happens quietly.<br />
              The kind that comes after confusion.<br />
              The kind that teaches you to come back to yourself, one thought at a time.
            </p>

            <p>
              If you found your way here, maybe you are also in a season of becoming. Maybe you are learning to let go, to choose yourself, to feel deeply without being ashamed of it, or to find meaning in the things you once thought would break you.
            </p>

            <p>
              I hope this space reminds you that you are not alone in your thoughts.<br />
              You are not too emotional.<br />
              You are not behind.<br />
              You are simply becoming.
            </p>

            <p className="pt-4">
              Welcome to Miss Joo Writes, a quiet corner for feelings, reflections, healing, and the stories we are still learning how to tell.
            </p>

            <div className="pt-8 border-t border-journal-border/30 text-center mt-12 space-y-4">
              <p className="text-journal-gold font-serif text-xl md:text-2xl italic leading-relaxed max-w-lg mx-auto">
                “Some stories are not written because they are perfect. They are written because they are true.”
              </p>
              <div className="font-signature text-3xl text-journal-gold select-none pt-2">
                With softness, Miss Joo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 md:py-20 bg-journal-bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 text-center space-y-6 max-w-xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
            Let's Connect
          </span>
          <h2 className="font-serif text-2xl text-journal-text">Let's connect</h2>
          
          <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed">
            For visual stories, everyday moments, and behind-the-scenes glimpses — find me on Instagram.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/missjooo98"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-journal-text hover:bg-journal-gold text-journal-bg rounded-full transition-all duration-300 font-sans text-[11px] tracking-widest uppercase font-medium shadow-sm"
            >
              <Instagram size={14} />
              <span>@missjooo98</span>
            </a>
            
            <Button 
              variant="outline" 
              className="rounded-full border border-journal-border hover:bg-journal-card text-journal-text tracking-widest uppercase text-[11px] h-12 px-8 transition-colors duration-300"
              asChild
            >
              <Link to="/contact">
                Send me a message
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
