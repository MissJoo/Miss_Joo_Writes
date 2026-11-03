// The Edit: four categories, each with a page (/lifestyle/<category>) and story pages (/lifestyle/<category>/<story>).
//
// PHOTOS: every `image` below is a file path in public/. Until that file exists, a labelled
// "Photo coming soon" placeholder shows in its place, so adding a photo is just saving it under that exact name.
// - Category photos (the cards on The Edit page) are in public/assets/edit/.
// - Café & Dining, Places & Travel and Soft Living use their one category photo for every story,
//   so replacing that one file updates their Featured Story, Collection cards and story pages together.
// - Beauty & Style stories each have their own photo spot in public/assets/edit/stories/<story>.webp;
//   until a story has its own photo, the Beauty & Style category photo stands in for it.

export interface EditStory {
  slug: string;
  title: string;
  /** "TOPIC · DATE" line on Collection cards */
  topic?: string;
  date?: string;
  /** On the Featured Story card */
  summary?: string;
  /** Story page: italic introduction, read time, italic opening line and paragraphs. Left out = "Story coming soon". */
  intro?: string;
  readTime?: string;
  opening?: string;
  body?: string[];
  image: string;
  /** Slugs of the two stories under "More from", when they are chosen by hand */
  moreFrom?: [string, string];
}

export interface EditCategory {
  slug: string;
  name: string;
  /** On The Edit page card */
  cardText: string;
  /** Under the heading on the category page */
  intro: string;
  image: { src: string; alt: string };
  featured: EditStory;
  collection: EditStory[];
}

export const COMING_SOON = "Story coming soon";

/** A story with no text yet: shows its title, its photo and "Story coming soon" */
export const hasStory = (story: EditStory) => Boolean(story.body?.length);

const beautyPhoto = (slug: string) => `/assets/edit/stories/${slug}.webp`;

/** Featured Story and six Collection cards for a category whose stories are still to come */
const comingSoonStories = (image: string) => ({
  featured: { slug: "featured-story", title: COMING_SOON, image },
  collection: [1, 2, 3, 4, 5, 6].map((n) => ({ slug: `story-${n}`, title: COMING_SOON, image })),
});

export const editCategories: EditCategory[] = [
  {
    slug: "beauty-style",
    name: "Beauty & Style",
    cardText: "Beauty rituals, skincare, perfumes and timeless wardrobe pieces.",
    intro: "Beauty rituals, skincare discoveries and timeless pieces chosen with intention.",
    image: { src: "/assets/edit/beauty-style.webp", alt: "A perfume bottle and a jar of cream beside white flowers in soft light" },
    featured: {
      slug: "the-beauty-rituals-i-keep-coming-back-to",
      title: "The Beauty Rituals I Keep Coming Back To",
      summary: "Simple, thoughtful routines that keep my skin healthy and my days a little softer.",
      intro:
        "Simple, thoughtful skincare and beauty rituals that keep my skin healthy, my routine easy and my days a little softer.",
      readTime: "6 min read",
      opening: "A little consistency goes a long way.",
      body: [
        "Over the years, I've learned that beauty doesn't have to be complicated. It's not about having a long list of products or following every trend. For me, it's about finding a few rituals that work, staying consistent and being intentional with what I use.",
        "These are the simple beauty rituals I keep coming back to, a routine that supports my skin, fits my lifestyle and makes me feel a little more put together, even on the busiest days.",
      ],
      image: beautyPhoto("the-beauty-rituals-i-keep-coming-back-to"),
      moreFrom: ["the-perfumes-im-loving-right-now", "a-timeless-wardrobe-for-everyday-living"],
    },
    collection: [
      { slug: "my-current-skincare-essentials", title: "My Current Skincare Essentials", topic: "Skincare", date: "Jun 28" },
      { slug: "a-timeless-wardrobe-for-everyday-living", title: "A Timeless Wardrobe for Everyday Living", topic: "Style", date: "Jun 21" },
      { slug: "the-perfumes-im-loving-right-now", title: "The Perfumes I'm Loving Right Now", topic: "Beauty", date: "Jun 14" },
      { slug: "a-minimal-makeup-routine-that-works", title: "A Minimal Makeup Routine That Works", topic: "Beauty", date: "Jun 07" },
      { slug: "small-beauty-rituals-that-make-a-difference", title: "Small Beauty Rituals That Make a Difference", topic: "Self-care", date: "May 31" },
      { slug: "rest-reset-glow", title: "Rest, Reset, Glow", topic: "Wellness", date: "May 24" },
    ].map((story) => ({ ...story, image: beautyPhoto(story.slug) })),
  },
  {
    slug: "cafe-dining",
    name: "Café & Dining",
    cardText: "Coffee shops, restaurants and dining experiences worth discovering.",
    intro: "Coffee shops, restaurants and dining experiences worth discovering.",
    image: { src: "/assets/edit/cafe-dining.webp", alt: "A latte and a croissant on a wooden café table" },
    ...comingSoonStories("/assets/edit/cafe-dining.webp"),
  },
  {
    slug: "places-travel",
    name: "Places & Travel",
    cardText: "Discoveries around Qatar and destinations beyond its borders.",
    intro: "Discoveries around Qatar and destinations beyond its borders.",
    image: {
      src: "/assets/edit/places-travel.webp",
      alt: "A lantern-lit stone walkway in Doha at golden hour, with a spiral minaret in the distance",
    },
    ...comingSoonStories("/assets/edit/places-travel.webp"),
  },
  {
    slug: "soft-living",
    name: "Soft Living",
    cardText: "Books, home finds, everyday rituals and intentional living.",
    intro: "Books, home finds, everyday rituals and intentional living.",
    image: { src: "/assets/edit/soft-living.webp", alt: "A lit candle, books, a vase of small white flowers and a latte on a wooden table" },
    ...comingSoonStories("/assets/edit/soft-living.webp"),
  },
];

export const getEditCategory = (slug: string | undefined) => editCategories.find((c) => c.slug === slug);

/** Featured Story first, then the Collection */
export const categoryStories = (category: EditCategory) => [category.featured, ...category.collection];

export const getEditStory = (category: EditCategory, slug: string | undefined) =>
  categoryStories(category).find((s) => s.slug === slug);

export const storyPath = (category: EditCategory, story: EditStory) => `/lifestyle/${category.slug}/${story.slug}`;

/**
 * The two stories under "More from": the hand-picked pair if set; otherwise the next two after this one,
 * starting again from the top after the last. A Collection story whose category has a written Featured Story
 * stays within the Collection; the others go through all of that category's stories.
 */
export const moreFromStories = (category: EditCategory, story: EditStory) => {
  const all = categoryStories(category);
  if (story.moreFrom) return story.moreFrom.map((slug) => all.find((s) => s.slug === slug)!).filter(Boolean);
  const pool = hasStory(category.featured) && category.collection.includes(story) ? category.collection : all;
  const i = pool.indexOf(story);
  return [pool[(i + 1) % pool.length], pool[(i + 2) % pool.length]];
};

/** Every category and story page, for prerendering and the sitemap */
export const editPaths = () =>
  editCategories.flatMap((category) => [
    { path: `/lifestyle/${category.slug}`, indexable: true },
    ...categoryStories(category).map((story) => ({ path: storyPath(category, story), indexable: hasStory(story) })),
  ]);
