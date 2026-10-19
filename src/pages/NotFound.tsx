import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PillarNav from "@/components/blog/PillarNav";

const NotFound = () => (
  <Layout>
    <section className="flex min-h-[70vh] items-center bg-journal-bg py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">404</span>
          <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">This page has wandered off</h1>
          <div className="w-12 h-px bg-journal-champagne/40 mx-auto"></div>
          <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light leading-relaxed">
            The page you were looking for doesn&rsquo;t exist, or it has moved. You might find what you need in one of these.
          </p>
          <PillarNav className="pt-2" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-full bg-gold px-8 text-[11px] uppercase tracking-widest text-espresso hover:bg-gold-hover transition-colors"
            >
              Back to the homepage
            </Link>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors font-medium"
            >
              Browse every essay
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFound;
