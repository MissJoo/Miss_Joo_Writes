export type PillarSlug =
  | "womanhood"
  | "psychology"
  | "career"
  | "life-in-qatar"
  | "fashion"
  | "beauty"
  | "travel";

export interface Pillar {
  slug: PillarSlug;
  name: string;
  /** Short label for the navigation menu */
  navLabel: string;
  /** Placeholder intro paragraph shown at the top of the hub */
  intro: string;
  /** Meta description for search results and link previews */
  description: string;
}

// Placeholder intro copy, to be replaced.
export const pillars: Pillar[] = [
  {
    slug: "womanhood",
    name: "Womanhood",
    navLabel: "Womanhood",
    intro:
      "Essays on becoming, softness, self-worth, and the quiet work of learning who you are as a woman, without shrinking to fit.",
    description: "Essays on womanhood, self-worth, softness and becoming. By MISS JOO.",
  },
  {
    slug: "psychology",
    name: "Psychology & Self-Growth",
    navLabel: "Psychology",
    intro:
      "Reflections on healing, letting go, emotional tiredness, peace, and the patterns we slowly learn to see in ourselves.",
    description: "Essays on psychology, healing and self-growth: letting go, peace, and emotional patterns. By MISS JOO.",
  },
  {
    slug: "career",
    name: "Career",
    navLabel: "Career",
    intro:
      "Notes on work, ambition, belonging in professional rooms, and the pressure to have it all figured out.",
    description: "Essays on career, ambition and belonging at work. By MISS JOO.",
  },
  {
    slug: "life-in-qatar",
    name: "Life in Qatar",
    navLabel: "Life in Qatar",
    intro:
      "Life abroad, observed from Qatar: homesickness, small rituals, and what it means to build a life far from where you started.",
    description: "Essays on life abroad in Qatar through a Filipina woman's eyes. By MISS JOO.",
  },
  {
    slug: "fashion",
    name: "Fashion",
    navLabel: "Fashion",
    intro: "Considered pieces, personal style, and dressing as a form of self-respect.",
    description: "Essays on fashion and personal style. By MISS JOO.",
  },
  {
    slug: "beauty",
    name: "Beauty & Skincare",
    navLabel: "Beauty",
    intro: "Skincare, self-care rituals, and beauty as a quiet act of attention.",
    description: "Essays on beauty, skincare and self-care rituals. By MISS JOO.",
  },
  {
    slug: "travel",
    name: "Travel",
    navLabel: "Travel",
    intro: "Slow journeys, new cities, and what travel teaches us about home.",
    description: "Essays on slow travel and the places that change us. By MISS JOO.",
  },
];

export const getPillar = (slug: string | undefined) => pillars.find((pillar) => pillar.slug === slug);
