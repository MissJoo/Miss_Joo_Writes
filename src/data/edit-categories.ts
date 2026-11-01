// The four categories on The Edit page, in order. Photos live in public/assets/edit/ (portrait 2:3, shown whole).
export interface EditCategory {
  number: string;
  name: string;
  headline: string;
  text: string;
  /** Small line under the text, e.g. "Around Qatar · Beyond Borders". Leave out for none. */
  tag?: string;
  quote: string;
  image: { src: string; alt: string };
}

export const editCategories: EditCategory[] = [
  {
    number: "01",
    name: "Beauty & Style",
    headline: "The Art of Feeling Like Yourself.",
    text: "From beauty rituals and skincare discoveries to timeless wardrobe pieces, perfumes and personal favourites. Things I choose, use and return to.",
    quote: "Elegance begins with knowing what feels like you.",
    image: { src: "/assets/edit/beauty-style.webp", alt: "A perfume bottle and a jar of cream beside white flowers in soft light" },
  },
  {
    number: "02",
    name: "Café & Dining",
    headline: "Good Coffee, Beautiful Spaces & Little Moments.",
    text: "Coffee shops, restaurants and dining experiences worth discovering. From quiet corners in Doha to places that make an ordinary afternoon feel special.",
    quote: "Some places make you want to stay a little longer.",
    image: { src: "/assets/edit/cafe-dining.webp", alt: "A latte and a croissant on a wooden café table" },
  },
  {
    number: "03",
    name: "Places & Travel",
    headline: "A Little Further, A Little More to Discover.",
    text: "Places I've explored, from hidden corners and cultural discoveries around Qatar to cities and destinations beyond. Not just where I've been, but what made each place memorable.",
    tag: "Around Qatar · Beyond Borders",
    quote: "The best places leave something with you.",
    image: { src: "/assets/edit/places-travel.webp", alt: "A lantern-lit stone walkway in Doha at golden hour, with a spiral minaret in the distance" },
  },
  {
    number: "04",
    name: "Soft Living",
    headline: "Finding Beauty in the Everyday.",
    text: "Books worth reading, thoughtful home finds, everyday discoveries and little rituals that make life feel more intentional. A collection of things that bring comfort, meaning and a little joy.",
    quote: "A beautiful life is built in the little things.",
    image: { src: "/assets/edit/soft-living.webp", alt: "A lit candle, books, a vase of small white flowers and a latte on a wooden table" },
  },
];
