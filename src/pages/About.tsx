import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs tracking-widest uppercase text-muted-foreground animate-fade-in">
              About
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 animate-fade-in-up">
              Hello, I'm <span className="font-signature text-primary font-normal not-italic tracking-normal text-[1.4em] translate-y-2 inline-block">Joo</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-section">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-8 prose-journal">
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-delay-1">
              I created Miss Joo Writes because some feelings do not fit inside an Instagram caption.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              Some thoughts need more space.<br />
              Some emotions need time before they make sense.<br />
              Some stories are too personal to be rushed, too layered to be posted and forgotten in a few seconds.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              For a long time, I carried so many things quietly .. the lessons, heartbreaks, overthinking, growth, soft moments, heavy nights, and the kind of feelings I did not always know how to explain. Writing became the place where I could finally let them breathe.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              This space is my personal journal on the internet.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              It is where I write about becoming, healing, letting go, self-worth, love, silence, softness, and the small realizations that change us slowly. Not because I have everything figured out, but because I am still learning too.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              I write for the version of me who felt too much.<br />
              The version of me who stayed longer than she should have.<br />
              The version of me who kept trying to understand everything.<br />
              And the version of me who is finally learning that peace matters too.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              Miss Joo Writes is not about perfect healing.<br />
              It is about honest healing.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              The kind that happens quietly.<br />
              The kind that comes after confusion.<br />
              The kind that teaches you to come back to yourself, one thought at a time.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              If you found your way here, maybe you are also in a season of becoming. Maybe you are learning to let go, to choose yourself, to feel deeply without being ashamed of it, or to find meaning in the things you once thought would break you.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              I hope this space reminds you that you are not alone in your thoughts.<br />
              You are not too emotional.<br />
              You are not behind.<br />
              You are simply becoming.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              Welcome to Miss Joo Writes, a quiet corner for feelings, reflections, healing, and the stories we are still learning how to tell.
            </p>

            <div className="pt-8 border-t border-border/50 animate-fade-in-delay-3 text-center mt-12">
              <p className="text-primary font-serif text-2xl md:text-3xl italic leading-relaxed">
                “Some stories are not written because they are perfect. They are written because they are true.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-section bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-2xl md:text-3xl">Let's connect</h2>
            
            <p className="text-muted-foreground">
              For visual stories, everyday moments, and behind-the-scenes glimpses—
              find me on Instagram.
            </p>

            <a
              href="https://instagram.com/missjooo98"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-sm hover:border-foreground/30 transition-all duration-300 group"
            >
              <Instagram size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="tracking-wide">@missjooo98</span>
            </a>

            <div className="pt-8">
              <Button variant="journal" size="journal" asChild>
                <Link to="/contact" className="text-sm">
                  Or send me a message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
