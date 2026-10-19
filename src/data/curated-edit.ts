// The Curated Edit (/lifestyle). Every card on the page reads from this file.
//
// HOW TO ADD A MONTHLY PICK
// 1. Find the card below (Cafés, Travel, Fashion, Soft Living, Brand Stories) and fill in its `pick`:
//      name    what you're recommending, e.g. the café, the city, the piece or the ritual
//      detail  one short line, e.g. Cafés: "Msheireb · order the cortado · best before 10 AM"
//                                   Fashion: why you keep wearing it
//      image   optional photo. Put it in public/images/curated/ (e.g. public/images/curated/cafe-october.webp)
//              and write its path from /images, e.g. "/images/curated/cafe-october.webp". A wide 3:2 photo works best.
//      link    optional, an essay ("/blog/...") or a website ("https://...")
// 2. Leave a pick as `undefined` (or delete it) and the card simply shows no pick line.
//    An image path that doesn't exist yet is ignored, so nothing broken ever shows.
// 3. Save, then push. The page rebuilds itself.
import maisonImage from "@/assets/MaisondeBeauteSalon.webp";

export interface CuratedPick {
  name: string;
  detail?: string;
  /** Path in public/, e.g. "/images/curated/cafe-october.webp" */
  image?: string;
  /** "/blog/..." or "https://..." */
  link?: string;
}

export interface CuratedCard {
  category: string;
  /** Optional heading above the subtitle (Beauty uses the salon's name) */
  title?: string;
  subtitle: string;
  text: string;
  quote: string;
  /** Makes the quote a link, usually to the essay it comes from */
  quoteLink?: string;
  pick?: CuratedPick;
  /** Small italic line under the text */
  note?: string;
  /** Shown only while the card has no pick, e.g. "First story coming soon." */
  emptyNote?: string;
  /** Card photo that isn't a pick (a pick's image replaces it) */
  image?: { src: string; alt: string; width: number; height: number };
  button?: { text: string; to: string };
}

export const curatedEdit: CuratedCard[] = [
  {
    category: "Beauty",
    title: "Maison de Beauté Salon",
    subtitle: "A quiet kind of self-care.",
    text: "Some places don't just offer a service — they offer a feeling. Maison de Beauté feels like one of those spaces where time slows down. Use my exclusive code MDB_MJ10 for 10% off.",
    quote: "Simple pleasures require no justification.",
    note: "Partner pick. I only share places I'd go back to.",
    image: {
      src: maisonImage,
      alt: "Maison de Beauté Salon interior, a serene beauty space with soft natural light",
      width: 1200,
      height: 674,
    },
    button: { text: "Inquire / Collaborate", to: "/contact" },
  },
  {
    category: "Cafés",
    subtitle: "Where I write, think and slow down in Doha.",
    text: "Every month, one café where the light is soft, the coffee is honest and nobody rushes you to leave. Most of my journal entries start in places like this.",
    quote: "I'm learning to take my life black.",
    quoteLink: "/blog/the-black-coffee-rule",
    // pick: { name: "Café name", detail: "Area · what to order · best time", image: "/images/curated/cafe.webp" },
    pick: undefined,
  },
  {
    category: "Travel",
    subtitle: "Places, remembered by how they felt.",
    text: "Not itineraries. The cities that changed something in me, and the small moments I still carry from them.",
    quote: "Travel returns us to our senses.",
    pick: { name: "Cologne", link: "/blog/enter-bigger-rooms-before-i-feel-ready" },
  },
  {
    category: "Fashion",
    subtitle: "Fewer pieces, worn with intention.",
    text: "Classic, feminine and made to last. The pieces I reach for when I need to feel like myself, from workdays in Doha to dinners abroad.",
    quote: "Simplicity is the ultimate sophistication.",
    // pick: { name: "The piece", detail: "Why I keep wearing it", image: "/images/curated/piece.webp" },
    pick: undefined,
  },
  {
    category: "Soft Living",
    subtitle: "Living with intention.",
    text: "Slower mornings, softer boundaries, and rest that doesn't have to be earned.",
    quote: "Rest is an active form of healing.",
    quoteLink: "/blog/embrace-quiet-moments",
    // pick: { name: "This month's ritual" },
    pick: undefined,
  },
  {
    category: "Brand Stories",
    subtitle: "Small makers, honest craft.",
    text: "Stories from independent and Qatar-based brands whose work is made with care. If you make something with intention, I'd love to hear about it.",
    quote: "Objects hold the care of their creators.",
    // pick: { name: "Brand name", detail: "What they make", image: "/images/curated/brand.webp", link: "https://..." },
    pick: undefined,
    emptyNote: "First story coming soon.",
    button: { text: "Let's Collaborate", to: "/contact" },
  },
];
