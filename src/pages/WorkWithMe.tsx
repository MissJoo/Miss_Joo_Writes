import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CONTACT_EMAIL, composeEmail } from "@/lib/email";

// Placeholder copy, to be replaced.

const offerings = [
  {
    title: "Editorial",
    body: "Long-form essays, guest columns and thoughtful features on womanhood, psychology, career and life abroad.",
  },
  {
    title: "UGC",
    body: "Considered, natural content for brands whose products fit genuinely into a slower, more intentional life.",
  },
  {
    title: "Brand Partnerships",
    body: "Selective, long-term collaborations across the journal, Instagram and TikTok, built around honest storytelling.",
  },
];

const platforms = [
  { name: "The Journal", detail: "missjoowrites.com", href: "/blog", internal: true },
  { name: "Instagram", detail: "@missjooo98", href: "https://www.instagram.com/missjooo98/" },
  { name: "TikTok", detail: "@missjooo98", href: "https://www.tiktok.com/@missjooo98" },
];

const WorkWithMe = () => (
  <Layout>
    <section className="border-b border-journal-border/30 bg-journal-bg py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
            Collaborations &amp; Press
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">Work With Me</h1>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="font-serif italic text-2xl md:text-3xl leading-snug text-journal-text">
            <span className="block">A journal read by women</span>
            <span className="block">who want depth over noise.</span>
          </p>
          <Link
            to="/about"
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
          >
            Read my story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-journal-bg-secondary/40 border-y border-journal-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-journal-text text-center mb-12">What I collaborate on</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {offerings.map((offering) => (
              <li key={offering.title} className="p-8 bg-journal-card border border-journal-border rounded-[2px] space-y-3">
                <h3 className="font-serif text-xl text-journal-text">{offering.title}</h3>
                <p className="text-sm text-journal-text-secondary font-light leading-relaxed">{offering.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-journal-text text-center mb-10">Platforms</h2>
          <ul className="grid gap-4 sm:grid-cols-3 text-center">
            {platforms.map((platform) => {
              const content = (
                <>
                  <span className="block font-serif text-lg text-journal-text">{platform.name}</span>
                  <span className="block text-xs tracking-wide text-journal-muted mt-1">{platform.detail}</span>
                </>
              );
              const className =
                "block p-6 border border-journal-border bg-journal-card rounded-[2px] hover:border-journal-champagne/60 transition-colors";
              return (
                <li key={platform.name}>
                  {platform.internal ? (
                    <Link to={platform.href} className={className}>
                      {content}
                    </Link>
                  ) : (
                    <a href={platform.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>

    <section className="pb-20 md:pb-28 bg-journal-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-5 border border-journal-border bg-journal-card px-6 py-12 rounded-[2px] shadow-sm">
          <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">Collaborations &amp; Press</span>
          <h2 className="font-serif text-2xl md:text-3xl text-journal-text">Let&rsquo;s tell a story worth remembering.</h2>
          <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
            For brand partnerships, press and media kit requests, send a short note about your brand and the story
            you&rsquo;d like to tell. I read every message personally.
          </p>
          <p className="font-serif text-xl text-journal-text select-all">{CONTACT_EMAIL}</p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => composeEmail("Collaboration with Miss Joo")}
              className="inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors"
            >
              Start a conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default WorkWithMe;
