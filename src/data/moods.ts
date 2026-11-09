export interface Mood {
  /** Text on the pill button */
  label: string;
  /** Slug of the "Start here" essay in src/data/posts.ts */
  essay: string;
  /** Slug of the "Also for this feeling" essay */
  also: string;
  /** One line under the "Start here" title */
  description: string;
}

// "How are you feeling today?" on the homepage. The first mood is selected until the reader taps another.
// To change a pairing or add a mood, edit this list; title, topic and reading time come from the post.
export const moods: Mood[] = [
  {
    label: "Tired of holding it together",
    essay: "strong-days",
    also: "emotionally-tired",
    description: "For the days you are strong, and the days you are just tired.",
  },
  {
    label: "Outgrowing something",
    essay: "outgrow-the-places-that-once-held-you",
    also: "no-longer-that-version",
    description: "For when something that once held you no longer fits.",
  },
  {
    label: "Starting over",
    essay: "september-feels-like-a-second-new-year",
    also: "growing-through-change",
    description: "For closing one chapter gently and beginning the next.",
  },
  {
    label: "Looking for peace",
    essay: "what-peace-taught-me",
    also: "embrace-quiet-moments",
    description: "For when you are ready to stop holding what keeps hurting you.",
  },
  {
    label: "Far from home",
    essay: "the-armor-i-built",
    also: "letters-never-sent",
    description: "For anyone building a life far from everything familiar.",
  },
  {
    label: "Feeling like too much",
    essay: "stopped-shrinking",
    also: "parts-of-myself-i-changed-to-fit-in",
    description: "For when you have been making yourself smaller to fit.",
  },
];

/** Photo in the homepage About Me section (portrait 4:5). It only shows once the file is in public/. */
export const moodPortrait = {
  src: "/assets/miss-joo-portrait.webp",
  caption: "I'm Miss Joo. I write the things we don't post.",
};
