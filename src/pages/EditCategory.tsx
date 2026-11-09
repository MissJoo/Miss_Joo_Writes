import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/NotFound";
import EditPath from "@/components/edit/EditPath";
import EditPhoto from "@/components/edit/EditPhoto";
import { COMING_SOON, getEditCategory, storyPath } from "@/data/edit-categories";

/** The Edit, level 2: one category with its Featured Story and The Collection. */
const EditCategory = () => {
  const { category: slug } = useParams<{ category: string }>();
  const category = getEditCategory(slug);
  if (!category) return <NotFound />;
  const { featured } = category;

  return (
    <Layout>
      <section className="bg-journal-bg pt-24 pb-16 lg:pt-28 lg:pb-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12">
          {/* Centred header: path, heading, italic intro */}
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <EditPath parts={[{ label: "The Edit", to: "/lifestyle" }, { label: category.name, to: `/lifestyle/${category.slug}` }]} />
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">{category.name}</h1>
            <p className="mx-auto max-w-lg font-serif italic text-lg md:text-xl leading-relaxed text-journal-text-secondary">
              {category.intro}
            </p>
          </div>

          {/* Featured Story: wide photo on the left, text on the right */}
          <Link
            to={storyPath(category, featured)}
            className="group mt-10 grid overflow-hidden rounded-xl border border-journal-border bg-journal-card shadow-sm transition-colors duration-300 hover:border-journal-champagne/60 md:grid-cols-[3fr_2fr]"
          >
            <EditPhoto src={featured.image} fallback={category.image.src} alt={featured.title} eager className="aspect-[4/3] md:h-full" />
            <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-gold">Featured Story</span>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                {featured.title}
              </h2>
              {featured.summary && (
                <p className="font-sans text-sm font-light leading-relaxed text-journal-text-secondary">{featured.summary}</p>
              )}
              <span className="inline-flex items-center gap-2 pt-2 font-sans text-xs font-medium uppercase tracking-widest text-journal-gold">
                Read Story <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* The Collection, with a thin line either side of the heading */}
          <div className="mt-14 mb-8 flex items-center gap-5">
            <span className="h-px flex-1 bg-journal-border" aria-hidden="true" />
            <h2 className="font-serif text-2xl md:text-3xl text-journal-text">The Collection</h2>
            <span className="h-px flex-1 bg-journal-border" aria-hidden="true" />
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {category.collection.map((story) => (
              <li key={story.slug}>
                <Link
                  to={storyPath(category, story)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-journal-border bg-journal-card transition-colors duration-300 hover:border-journal-champagne/60"
                >
                  <EditPhoto src={story.image} fallback={category.image.src} alt={story.title} className="aspect-[4/3]" />
                  <div className="flex flex-1 flex-col space-y-2 p-5">
                    {story.title !== COMING_SOON && story.topic && (
                      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-journal-gold">
                        {story.topic} · {story.date}
                      </span>
                    )}
                    <h3 className="flex-1 font-serif text-xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                      {story.title}
                    </h3>
                    <span aria-hidden="true" className="pt-1 font-sans text-base text-journal-gold">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default EditCategory;
