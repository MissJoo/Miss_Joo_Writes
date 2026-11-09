import { Link, useParams } from "react-router-dom";
import { PenLine } from "lucide-react";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/NotFound";
import EditPath from "@/components/edit/EditPath";
import EditPhoto from "@/components/edit/EditPhoto";
import ShareButtons from "@/components/blog/ShareButtons";
import { COMING_SOON, getEditCategory, getEditStory, hasStory, moreFromStories, storyPath, type EditBlock } from "@/data/edit-categories";
import { canonicalUrl } from "@/lib/seo";

const column = "mx-auto max-w-2xl";
const smallLabel = "block font-sans text-[10px] font-medium uppercase tracking-[0.3em]";

/** One part of a longer story. Text and single photos keep to the reading column; cards use the full width. */
const StoryBlock = ({ block }: { block: EditBlock }) => {
  if (block.kind === "heading") {
    return <h2 className={`${column} !mt-12 font-serif text-2xl md:text-3xl leading-snug text-journal-text`}>{block.text}</h2>;
  }
  if (block.kind === "text") return <p className={column}>{block.text}</p>;
  if (block.kind === "photo") {
    return (
      <div className={column}>
        <EditPhoto src={block.src} alt={block.alt} className="aspect-[4/5] rounded-xl border border-journal-border" />
      </div>
    );
  }
  return (
    <ul className="!mt-8 grid gap-5 md:grid-cols-3">
      {block.items.map((item) => (
        <li key={item.number} className="flex flex-col overflow-hidden rounded-xl border border-journal-border bg-journal-card">
          <EditPhoto src={item.src} alt={item.alt} className="aspect-[4/5]" />
          <div className="space-y-2 p-5">
            <span className={`${smallLabel} text-journal-gold`}>{item.number}</span>
            <h3 className="font-serif text-xl leading-snug text-journal-text">{item.title}</h3>
            <p className="font-sans text-sm font-light leading-relaxed text-journal-text-secondary">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

/** The Edit, level 3: one story. Stories without text yet show their title, photo and "Story coming soon". */
const EditStory = () => {
  const { category: categorySlug, story: storySlug } = useParams<{ category: string; story: string }>();
  const category = getEditCategory(categorySlug);
  const story = category && getEditStory(category, storySlug);
  if (!category || !story) return <NotFound />;
  const written = hasStory(story);
  const longer = Boolean(story.blocks);

  return (
    <Layout>
      <article className="bg-journal-bg pt-24 pb-14 lg:pt-28 lg:pb-20">
        <div className={`container mx-auto px-6 lg:px-12 ${longer ? "max-w-5xl" : "max-w-3xl"}`}>
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

          <EditPhoto
            src={story.image}
            fallback={category.image.src}
            alt={story.imageAlt ?? story.title}
            eager
            className={`mt-8 rounded-xl border border-journal-border ${longer ? "aspect-[4/3] object-[center_12%]" : "aspect-[16/9]"}`}
          />

          {written ? (
            <div className="mt-10 space-y-6 font-sans text-[17px] font-light leading-[1.85] text-journal-text-secondary">
              <p className={longer ? `${column} font-serif italic text-xl md:text-2xl leading-snug text-journal-text` : "text-center font-serif italic text-2xl md:text-3xl leading-snug text-journal-text"}>
                {story.opening}
              </p>
              {story.body!.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={longer ? column : undefined}>{paragraph}</p>
              ))}
              {story.blocks?.map((block, index) => <StoryBlock key={index} block={block} />)}

              {story.review && (
                <section aria-label={story.review.heading} className={`${column} !mt-10 rounded-xl border border-journal-border bg-journal-card p-6 md:p-8`}>
                  <span className={`${smallLabel} text-journal-gold`}>{story.review.label}</span>
                  <h2 className="mt-2 font-serif text-2xl md:text-3xl leading-snug text-journal-text">{story.review.heading}</h2>
                  <dl className="mt-4 border-t border-journal-border text-sm leading-relaxed">
                    {story.review.rows.map(([name, value]) => (
                      <div key={name} className="flex justify-between gap-4 border-b border-journal-border py-3">
                        <dt>{name}</dt>
                        <dd className="text-right text-journal-text">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <h3 className="mt-5 font-serif text-xl leading-snug text-journal-text">{story.review.subheading}</h3>
                  <p className="mt-1 text-sm leading-relaxed md:text-base">{story.review.text}</p>
                </section>
              )}

              {story.closing && (
                <div className={`${column} !mt-10 space-y-6 text-center`}>
                  <p className="font-serif italic text-xl md:text-2xl leading-snug text-journal-text">{story.closing.line}</p>
                  <p>{story.closing.text}</p>
                  {/* The agreed sign-off: same fonts as the Journal articles */}
                  <footer className="space-y-6 md:space-y-7">
                    <p>Until the next page,</p>
                    <p className="font-signature text-2xl leading-snug text-journal-gold">-Miss Joo</p>
                  </footer>
                  <span className={`${smallLabel} text-journal-muted`}>{story.closing.label}</span>
                </div>
              )}

              {story.share && (
                <div className={`${column} !mt-10 space-y-3 text-center`}>
                  <div className="mx-auto mb-8 h-px w-12 bg-journal-champagne/60" aria-hidden="true" />
                  <h2 className="font-serif text-2xl leading-snug text-journal-text">{story.share.heading}</h2>
                  <p className="pb-3">{story.share.text}</p>
                  <ShareButtons url={canonicalUrl(storyPath(category, story))} title={story.title} />
                </div>
              )}
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
                  className="group flex h-full overflow-hidden rounded-xl border border-journal-border bg-journal-card transition-colors duration-300 hover:border-journal-champagne/60"
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
