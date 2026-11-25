import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CONTACT_EMAIL, composeEmail } from "@/lib/email";

const offerings = [
  {
    title: "Editorial",
    body: "Essays and features on how women think, love and grow, written from life in Qatar.",
  },
  {
    title: "UGC",
    body: "Short videos for Instagram and TikTok that show a product in real, everyday use, filmed and edited by me.",
  },
  {
    title: "Brand Partnerships",
    body: "Features, reels and reviews across the journal, Instagram and TikTok, including café and dining in Doha for The Edit. I only work with brands I'd use myself.",
  },
];

// Sections alternate burgundy and ivory, like the homepage
const WorkWithMe = () => (
  <Layout>
    <div className="hb-dark bg-journal-bg">
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
    </div>

    <div className="hb-light bg-journal-bg">
      <section className="py-16 md:py-20 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug text-journal-text">
              <span className="block">A journal read by women</span>
              <span className="block">who want depth over noise.</span>
            </p>
            <ul aria-label="Miss Joo in numbers" className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-2">
              {[
                ["28M+", "Views on my top 3 reels"],
                ["48K+", "Readers on Instagram"],
                ["120+", "Essays published"],
              ].map(([value, label]) => (
                <li key={label}>
                  <strong className="block font-serif text-3xl md:text-4xl font-normal leading-none text-journal-gold">{value}</strong>
                  <span className="mt-2 block text-[10px] tracking-[0.25em] uppercase text-journal-muted font-sans font-medium">{label}</span>
                </li>
              ))}
            </ul>
            <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
              Most of my Instagram audience is 25 to 44, with the largest groups in the United States, Qatar, India and the UAE.
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
    </div>

    <div className="hb-dark bg-journal-bg">
      <section className="py-16 md:py-20 bg-journal-bg-secondary/40 border-y border-journal-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-journal-text text-center mb-12">
              <span aria-hidden="true" className="text-journal-gold text-base align-middle mr-3">✦</span>
              Ways to Collaborate
              <span aria-hidden="true" className="text-journal-gold text-base align-middle ml-3">✦</span>
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {offerings.map((offering) => (
                <li key={offering.title} className="p-8 bg-journal-card border border-journal-border rounded-xl space-y-3 text-center">
                  <h3 className="font-serif text-xl text-journal-text">{offering.title}</h3>
                  <div className="w-8 h-px bg-journal-champagne/40 mx-auto"></div>
                  <p className="text-sm text-journal-text-secondary font-light leading-relaxed">{offering.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div className="hb-light bg-journal-bg">
      <section className="pt-16 md:pt-20 pb-20 md:pb-28 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-5 border border-journal-border bg-journal-card px-6 py-12 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl md:text-3xl text-journal-text">Have a brand that belongs here? Let&rsquo;s talk.</h2>
            <p className="text-journal-text-secondary text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
              For brand partnerships and press enquiries, send me a note about your brand and the story
              you&rsquo;d like to share. I read every message personally.
            </p>
            <p className="font-serif text-xl text-journal-text select-all">{CONTACT_EMAIL}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => composeEmail("Collaboration with Miss Joo")}
                className="inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors"
              >
                Send an inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default WorkWithMe;
