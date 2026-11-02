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
          <EditPath parts={[{ label: "The Edit", to: "/lifestyle" }, { label: category.name, to: `/lifestyle/${category.slug}` }]} />

          <div className="mt-8 max-w-2xl space-y-4">
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text">{category.name}</h1>
            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-journal-text-secondary">{category.intro}</p>
          </div>

          {/* Featured Story */}
          <Link
            to={storyPath(category, featured)}
            className="group mt-12 grid overflow-hidden rounded-[3px] border border-journal-border bg-journal-card shadow-sm transition-colors duration-300 hover:border-journal-champagne/60 md:grid-cols-2"
          >
            <EditPhoto src={featured.image} alt={featured.title} eager className="md:h-full" />
            <div className="flex flex-col justify-center space-y-4 p-6 md:p-10">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-gold">Featured Story</span>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                {featured.title}
              </h2>
              {featured.summary && (
                <p className="font-sans text-sm md:text-base font-light leading-relaxed text-journal-text-secondary">{featured.summary}</p>
              )}
              <span className="inline-flex items-center gap-2 pt-2 font-sans text-xs font-medium uppercase tracking-widest text-journal-gold">
                Read Story <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* The Collection */}
          <h2 className="mt-16 mb-8 font-serif text-2xl md:text-3xl text-journal-text">The Collection</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {category.collection.map((story) => (
              <li key={story.slug}>
                <Link to={storyPath(category, story)} className="group block space-y-3">
                  <EditPhoto src={story.image} alt={story.title} className="rounded-[3px] border border-journal-border" />
                  {story.title !== COMING_SOON && story.topic && (
                    <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-journal-gold">
                      {story.topic} · {story.date}
                    </span>
                  )}
                  <h3 className="font-serif text-xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                    {story.title}
                  </h3>
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
