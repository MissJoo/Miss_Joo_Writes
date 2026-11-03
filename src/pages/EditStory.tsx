import { Link, useParams } from "react-router-dom";
import { PenLine } from "lucide-react";
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
      <article className="bg-journal-bg pt-24 pb-14 lg:pt-28 lg:pb-20">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12">
          {/* Centred header: path, title, italic intro, byline */}
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <EditPath parts={[{ label: "The Edit", to: "/lifestyle" }, { label: category.name, to: `/lifestyle/${category.slug}` }]} />
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text [text-wrap:balance]">{story.title}</h1>
            {written && (
              <>
                <p className="font-serif italic text-lg md:text-xl leading-relaxed text-journal-text-secondary">{story.intro}</p>
                <p className="inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-muted">
                  <PenLine size={14} aria-hidden="true" className="text-journal-gold" />
                  By Miss Joo <span aria-hidden="true">|</span> {story.readTime}
                </p>
              </>
            )}
          </div>

          <EditPhoto src={story.image} fallback={category.image.src} alt={story.title} eager className="mt-8 aspect-[16/9] rounded-[3px] border border-journal-border" />

          {written ? (
            <div className="mt-10 space-y-6 font-sans text-[17px] font-light leading-[1.85] text-journal-text-secondary">
              <p className="text-center font-serif italic text-2xl md:text-3xl leading-snug text-journal-text">{story.opening}</p>
              {story.body!.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ) : (
            story.title !== COMING_SOON && (
              <p className="mt-10 text-center font-serif italic text-xl text-journal-text-secondary">{COMING_SOON}</p>
            )
          )}

          {/* More from this category: a thin line either side of the heading, then two side-by-side cards */}
          <div className="mt-14 mb-8 flex items-center gap-5">
            <span className="h-px flex-1 bg-journal-border" aria-hidden="true" />
            <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-gold">More from {category.name}</h2>
            <span className="h-px flex-1 bg-journal-border" aria-hidden="true" />
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {moreFromStories(category, story).map((next) => (
              <li key={next.slug}>
                <Link
                  to={storyPath(category, next)}
                  className="group flex h-full overflow-hidden rounded-[3px] border border-journal-border bg-journal-card transition-colors duration-300 hover:border-journal-champagne/60"
                >
                  <EditPhoto src={next.image} fallback={category.image.src} alt={next.title} className="aspect-[4/5] w-2/5 shrink-0" />
                  <div className="flex flex-1 flex-col justify-center space-y-3 p-4">
                    <h3 className="font-serif text-lg leading-snug text-journal-text group-hover:text-journal-gold transition-colors duration-300">
                      {next.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-widest text-journal-gold">
                      Read Story <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Layout>
  );
};

export default EditStory;
