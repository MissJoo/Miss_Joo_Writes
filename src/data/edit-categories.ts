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
  closing?: { line: string; text?: string; label: string };
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
    cardText: "Skincare, perfumes and the wardrobe pieces I keep reaching for.",
    intro: "The products I actually use, the scents I wear on repeat, and the pieces that make me feel like myself.",
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
      { slug: "my-current-skincare-essentials", title: "My Current Skincare Essentials", topic: "Skincare" },
      { slug: "a-timeless-wardrobe-for-everyday-living", title: "A Timeless Wardrobe for Everyday Living", topic: "Style" },
      { slug: "the-perfumes-im-loving-right-now", title: "The Perfumes I'm Loving Right Now", topic: "Beauty" },
      { slug: "a-minimal-makeup-routine-that-works", title: "A Minimal Makeup Routine That Works", topic: "Beauty" },
      { slug: "small-beauty-rituals-that-make-a-difference", title: "Small Beauty Rituals That Make a Difference", topic: "Self-care" },
      { slug: "rest-reset-glow", title: "Rest, Reset, Glow", topic: "Wellness" },
    ].map((story) => ({ ...story, image: beautyPhoto(story.slug) })),
  },
  {
    slug: "cafe-dining",
    name: "Café & Dining",
    cardText: "Cafés and restaurants in Doha, with what to order and when to go.",
    intro: "Where I write, meet friends and slow down in Doha. Every review gives you the price, the hours and my order.",
    image: { src: "/assets/edit/cafe-dining.webp", alt: "A latte and a croissant on a wooden café table" },
    ...comingSoonStories("/assets/edit/cafe-dining.webp"),
    featured: {
      slug: "cotti-coffee-souq-waqif",
      title: "Cotti Coffee Souq Waqif: A Quiet Coffee Stop in the Heart of Doha",
      summary: "A calm room across from Souq Waqif, open until 11 PM, with drinks at QR 13 and the metro a short walk away.",
      intro: "A calm room across from Souq Waqif, open until 11 PM, with drinks at QR 13 and the metro a short walk away.",
      readTime: "3 min read",
      image: "/images/cotti-souq-waqif-storefront.jpg",
      imageAlt: "The lit Cotti Coffee storefront at Souq Waqif in the evening, with small tables outside",
      seoTitle: "Cotti Coffee Souq Waqif: Hours, Prices and What to Order | Miss Joo Writes",
      seoDescription: "A calm coffee stop in Al Fardan Centre, across from Souq Waqif. Open 7:30 AM to 11 PM, drinks from QR 13, free Wi-Fi, and three drinks worth ordering.",
      datePublished: "2026-11-09",
      opening: "Not every coffee break needs a special occasion. Sometimes, you just need somewhere comfortable to sit for a while.",
      body: [
        "Cotti Coffee at Al Fardan Centre gives you exactly that. Step through the glass doors and the noise of the street fades: warm wood, soft lighting and a room that feels a world away from the crowds outside.",
        "It's an easy stop after walking through the market, or before an evening around the souq.",
      ],
      blocks: [
        { kind: "heading", text: "Where to Find It" },
        {
          kind: "photo",
          src: "/images/cotti-al-fardan-centre.jpg",
          alt: "Al Fardan Centre at night, with the lit Cotti Coffee storefront on the ground floor",
          wide: true,
        },
        { kind: "text", text: "Cotti Coffee is on the ground floor of Al Fardan Centre, on Ali Bin Abdullah Street, directly across from Souq Waqif." },
        {
          kind: "text",
          text: "You don't need a car. Souq Waqif Metro Station is a short walk away.",
        },
        {
          kind: "text",
          text: "Address:",
          link: { label: "Cotti Coffee, Al Fardan Centre", href: "https://share.google/wS7meROO3rVJqOGe9" },
        },
        {
          kind: "text",
          text: "Opening hours: 7:30 AM to 11 PM. Their website says they close at 10 PM, but they're open until 11 PM, so you have time for a late coffee after the souq.",
        },
        { kind: "text", text: "Price: Each of the three drinks below is QR 13." },
        { kind: "text", text: "Good to know: Free Wi-Fi, and enough seating for a solo laptop session or a table of friends." },
        { kind: "heading", text: "What to Order: Three Drinks Worth Trying" },
        { kind: "text", text: "Not sure what to order on your first visit? These are my three." },
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
          text: "It gets busy on Thursday and Friday evenings, when the souq is at its fullest. For a quiet coffee, go on a Monday or Tuesday, when you can almost have the room to yourself.",
        },
        {
          kind: "text",
          text: "I like that I can sit with my drink without leaving the area. It's a simple convenience, but sometimes that's exactly what makes a place worth returning to.",
        },
      ],
      review: {
        label: "The Edit Verdict",
        heading: "My Verdict",
        rows: [
          ["Best for", "A slow coffee on your own, or catching up with friends"],
          ["Go-to order", "Matcha Mango Coconut, large, iced, half sugar"],
          ["Price", "QR 13 per drink"],
          ["Hours", "7:30 AM to 11 PM"],
          ["Best time to visit", "Monday or Tuesday, when it's quiet"],
          ["Good to know", "Free Wi-Fi. No car needed: Souq Waqif Metro is a short walk away."],
        ],
        note: "Note: Thursday and Friday evenings get busy.",
        subheading: "Would I recommend it?",
        text: "Yes, especially if you're exploring Souq Waqif and want a quieter place to sit before heading back out.",
      },
      closing: {
        line: "Next time you're near the souq, skip the crowd for twenty minutes. Order the Matcha Mango Coconut, find a seat, and let the evening wait.",
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
    cardText: "Places around Qatar, and the cities that changed something in me.",
    intro: "Not itineraries. The places in Qatar I keep going back to, and the cities abroad I still think about.",
    image: {
      src: "/assets/edit/places-travel.webp",
      alt: "A lantern-lit stone walkway in Doha at golden hour, with a spiral minaret in the distance",
    },
    ...comingSoonStories("/assets/edit/places-travel.webp"),
  },
  {
    slug: "soft-living",
    name: "Soft Living",
    cardText: "Books, small rituals and the habits that make ordinary days softer.",
    intro: "What I'm reading, the routines that keep me steady, and the small things that make home feel like home.",
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
  // Only finished stories, never "Story coming soon" cards
  return all.filter((s) => s !== story && hasStory(s)).slice(0, 2);
};

/** Every category and story page, for prerendering and the sitemap */
export const editPaths = () =>
  editCategories.flatMap((category) => [
    { path: `/lifestyle/${category.slug}`, indexable: true, lastmod: category.featured.datePublished },
    ...categoryStories(category).map((story) => ({ path: storyPath(category, story), indexable: hasStory(story), lastmod: story.datePublished })),
  ]);
