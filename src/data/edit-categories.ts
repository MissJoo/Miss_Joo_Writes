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
  /** Alt text for the main photo, when it should say more than the title */
  imageAlt?: string;
  /** Search result title and description, when they differ from the defaults */
  seoTitle?: string;
  seoDescription?: string;
  /** ISO publish date (YYYY-MM-DD), for search engines */
  datePublished?: string;
  /** A longer story: headings, photos and cards after the opening paragraphs */
  blocks?: EditBlock[];
  review?: { label: string; heading: string; rows: [string, string][]; note?: string; subheading: string; text: string };
  closing?: { line: string; text: string; label: string };
  share?: { heading: string; text: string };
}

export type EditBlock =
  | { kind: "heading"; text: string }
  | { kind: "text"; text: string; link?: { label: string; href: string } }
  | { kind: "photo"; src: string; alt: string; wide?: boolean }
  | { kind: "cards"; items: { number: string; title: string; text: string; src: string; alt: string }[] };

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
    featured: {
      slug: "cotti-coffee-souq-waqif",
      title: "Cotti Coffee Souq Waqif: A Quiet Coffee Stop in the Heart of Doha",
      summary: "A quiet coffee stop just across from Souq Waqif, with the metro only a short walk away.",
      intro: "A quiet coffee stop just across from Souq Waqif, with the metro only a short walk away.",
      readTime: "2 min read",
      image: "/images/cotti-souq-waqif-storefront.jpg",
      imageAlt: "The lit Cotti Coffee storefront at Souq Waqif in the evening, with small tables outside",
      seoTitle: "Cotti Coffee Souq Waqif: A Quiet Coffee Stop in Doha | Miss Joo Writes",
      seoDescription: "A quiet coffee stop inside Al Fardan Centre, just across from Souq Waqif, plus three drinks worth ordering, from Miss Joo.",
      datePublished: "2026-11-09",
      opening: "Not every coffee break needs to come with a special occasion. Sometimes, you just need somewhere comfortable to sit for a while.",
      body: [
        "Cotti Coffee at Al Fardan Centre offers exactly that kind of pause. Step through the glass doors and the atmosphere shifts: warm wood, soft lighting and a quieter setting that feels a world away from the activity outside.",
        "Located just across from Souq Waqif, it's a convenient stop after exploring the market or spending an evening around the area.",
      ],
      blocks: [
        { kind: "heading", text: "Where to Find It" },
        {
          kind: "photo",
          src: "/images/cotti-al-fardan-centre.jpg",
          alt: "Al Fardan Centre at night, with the lit Cotti Coffee storefront on the ground floor",
          wide: true,
        },
        { kind: "text", text: "Cotti Coffee is located inside Al Fardan Centre on Ali Bin Abdullah Street, directly across from Souq Waqif." },
        {
          kind: "text",
          text: "It's also within a short walking distance of Souq Waqif Metro Station, making it easy to reach without needing a car.",
        },
        {
          kind: "text",
          text: "Address:",
          link: { label: "Cotti Coffee - Al Fardan Center", href: "https://share.google/wS7meROO3rVJqOGe9" },
        },
        { kind: "heading", text: "What to Order: Three Drinks Worth Trying" },
        { kind: "text", text: "Not sure what to order on your first visit? Here are three drinks I'd recommend putting on your list." },
        {
          kind: "cards",
          items: [
            {
              number: "01",
              title: "Matcha Mango Coconut",
              text: "Matcha with a soft tropical twist of mango and coconut. I order mine large, iced and with half sugar.",
              src: "/images/cotti-matcha-mango-coconut.jpg",
              alt: "An iced Matcha Mango Coconut from Cotti Coffee",
            },
            {
              number: "02",
              title: "Matcha Coconut Coffee Latte",
              text: "Coconut matcha below, coffee layered on top. The one to order when you can't choose between matcha and coffee.",
              src: "/images/cotti-matcha-coconut-coffee-latte.jpg",
              alt: "An iced Matcha Coconut Coffee Latte with coffee layered over matcha",
            },
            {
              number: "03",
              title: "Pampas Blue Coco Latte",
              text: "Cotti's coffee blend with milk and coconut milk, tinted a soft blue. An easy coconut latte, and the prettiest cup on the menu.",
              src: "/images/cotti-pampas-blue-coco-latte.jpg",
              alt: "An iced Pampas Blue Coco Latte with a soft blue base",
            },
          ],
        },
        { kind: "heading", text: "What Makes This Branch Worth Visiting?" },
        {
          kind: "text",
          text: "My favorite time to visit is Thursday or Friday evening. There's usually plenty happening around Souq Waqif, so having somewhere quieter to step into makes the coffee break even more enjoyable.",
        },
        { kind: "text", text: "I like that I can enjoy my drink without having to leave the area or go too far from the souq." },
        { kind: "text", text: "It's a simple convenience, but sometimes that's exactly what makes a place worth returning to." },
      ],
      review: {
        label: "The Edit Verdict",
        heading: "My Verdict",
        rows: [
          ["Best for", "A relaxed coffee break or a little solo time"],
          ["Go-to order", "Matcha Mango Coconut Latte"],
          ["Best time to visit", "Weekdays"],
          ["One thing to know", "It's conveniently located just across from Souq Waqif."],
        ],
        note: "Note: Weekend visits can feel busier than other days.",
        subheading: "Would I recommend it?",
        text: "Yes. Especially if you're exploring Souq Waqif and want somewhere quieter to enjoy a coffee before heading back out. Get yourself a Matcha Mango Coconut Latte and take your time.",
      },
      closing: {
        line: "Sometimes, all you need is a good drink and a little time to yourself.",
        text: "Enjoy your coffee and the calm surroundings!",
        label: "The Edit | Café & Dining | Doha, Qatar",
      },
      share: {
        heading: "Enjoyed this little discovery?",
        text: "Share this article with someone who would appreciate a quiet coffee stop in Doha.",
      },
    },
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
    { path: `/lifestyle/${category.slug}`, indexable: true, lastmod: category.featured.datePublished },
    ...categoryStories(category).map((story) => ({ path: storyPath(category, story), indexable: hasStory(story), lastmod: story.datePublished })),
  ]);
