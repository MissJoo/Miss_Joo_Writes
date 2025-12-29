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
              Hello, I'm <span className="italic text-dusty-rose">Jo</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-section">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-8 prose-journal">
            <p className="text-lg text-foreground leading-relaxed animate-fade-in-delay-1">
              I've always believed that some feelings are too big for Instagram captions. 
              Too layered for a quick scroll. Too meaningful to disappear into the algorithm.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              This space was born from that belief—a quiet corner of the internet where I can 
              explore the depths of what it means to be human. To grow, to heal, to stumble, 
              and to find beauty in the mess of it all.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              I write about the things that keep me up at night and the moments that make 
              everything feel worth it. About the journey of becoming who I'm meant to be, 
              even when I don't know exactly what that looks like yet.
            </p>

            <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-2">
              If you've found your way here, maybe you're looking for the same thing I am—
              a reminder that it's okay to feel deeply, to question everything, and to take 
              your time figuring things out. You're not alone in that.
            </p>

            <div className="pt-8 border-t border-border/50 animate-fade-in-delay-3">
              <p className="text-foreground font-serif text-xl italic mb-6">
                "Write the story only you can tell."
              </p>
              <p className="text-muted-foreground text-sm">
                Welcome to my journal. I'm glad you're here.
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
