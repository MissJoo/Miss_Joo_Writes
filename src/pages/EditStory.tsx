import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/NotFound";
import EditPath from "@/components/edit/EditPath";
import EditPhoto from "@/components/edit/EditPhoto";
import { COMING_SOON, getEditCategory, getEditStory, hasStory, moreFromStories, storyPath } from "@/data/edit-categories";

/** The Edit, level 3: one story. Stories without text yet show their title, photo and "Story coming soon". */
const EditStory = () => {
  const { category: categorySlug, story: storySlug } = useParams<{ category: string; story: string }>();
  const category = getEditCategory(categorySlug);
  const story = category && getEditStory(category, storySlug);
  if (!category || !story) return <NotFound />;
  const written = hasStory(story);

  return (
    <Layout>
      <article className="bg-journal-bg pt-24 pb-16 lg:pt-28 lg:pb-24">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12">
          <EditPath parts={[{ label: "The Edit", to: "/lifestyle" }, { label: category.name, to: `/lifestyle/${category.slug}` }]} />

          <h1 className="mt-8 font-serif text-3.5xl md:text-5xl leading-tight text-journal-text [text-wrap:balance]">{story.title}</h1>

          {written && (
            <>
              <p className="mt-5 font-serif italic text-lg md:text-xl leading-relaxed text-journal-text-secondary">{story.intro}</p>
              <p className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-muted">
                By Miss Joo <span className="mx-2" aria-hidden="true">|</span> {story.readTime}
              </p>
            </>
          )}

          <EditPhoto src={story.image} alt={story.title} eager className="mt-8 rounded-[3px] border border-journal-border" />

          {written ? (
            <div className="mt-10 space-y-6 font-sans text-[17px] font-light leading-[1.85] text-journal-text-secondary">
              <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-journal-text">{story.opening}</p>
              {story.body!.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ) : (
            story.title !== COMING_SOON && (
              <p className="mt-10 text-center font-serif italic text-xl text-journal-text-secondary">{COMING_SOON}</p>
            )
          )}
        </div>
      </article>

      {/* More from this category */}
      <section className="border-t border-journal-border bg-journal-bg py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12">
          <h2 className="mb-8 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-gold">
            More from {category.name}
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2">
            {moreFromStories(category, story).map((next) => (
              <li key={next.slug}>
                <Link to={storyPath(category, next)} className="group block space-y-3">
                  <EditPhoto src={next.image} alt={next.title} className="rounded-[3px] border border-journal-border" />
                  <h3 className="font-serif text-xl leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                    {next.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-widest text-journal-gold">
                    Read Story <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default EditStory;
