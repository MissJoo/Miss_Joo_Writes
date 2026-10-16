import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import PillarNav from "@/components/blog/PillarNav";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getPillar, type PillarSlug } from "@/data/pillars";
import { getPostsByPillar, readingTime } from "@/data/posts";
import { suitcase } from "@/data/suitcase";
import { SuitcaseHubFeature } from "@/components/suitcase/SuitcaseTeasers";

const PillarHub = ({ slug }: { slug: PillarSlug }) => {
  const pillar = getPillar(slug)!;
  const pillarPosts = getPostsByPillar(slug);

  return (
    <Layout>
      <section className="border-b border-journal-border/30 bg-journal-bg py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
              Essays on
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">{pillar.name}</h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
              {pillar.intro}
            </p>
            <PillarNav active={slug} className="pt-6" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          {slug === suitcase.pillar && <SuitcaseHubFeature />}
          {pillarPosts.length > 0 ? (
            <>
              <h2 className="text-center font-sans text-[10px] font-normal uppercase tracking-widest text-journal-muted mb-10">
                {pillarPosts.length} {pillarPosts.length === 1 ? "essay" : "essays"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {pillarPosts.map((post) => (
                  <BlogPostCard key={post.slug} {...post} readingTime={readingTime(post)} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 px-6 bg-journal-card border border-journal-border max-w-md mx-auto rounded-[2px] space-y-4">
              <p className="font-serif italic text-lg text-journal-text-secondary">The first essays here are still being written.</p>
              <Link
                to="/blog"
                className="inline-block text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors font-medium"
              >
                Read the journal in the meantime →
              </Link>
            </div>
          )}

          <NewsletterSignup source={`hub-${slug}`} className="mt-20" />
        </div>
      </section>
    </Layout>
  );
};

export default PillarHub;
