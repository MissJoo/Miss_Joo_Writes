export interface Mood {
  /** Text on the pill button */
  label: string;
  /** Slug of the essay in src/data/posts.ts */
  essay: string;
}

// "How are you feeling today?" on the homepage. Nothing is selected until the reader taps a mood.
// To change a pairing or add a mood, edit this list; category, title, opening lines and reading time come from the post.
export const moods: Mood[] = [
  { label: "Tired of holding it together", essay: "emotionally-tired" },
  { label: "Outgrowing something", essay: "outgrow-the-places-that-once-held-you" },
  { label: "Starting over", essay: "new-beginnings" },
  { label: "Looking for peace", essay: "what-peace-taught-me" },
  { label: "Far from home", essay: "things-i-never-expected-to-miss" },
  { label: "Feeling like too much", essay: "my-standards-are-finally-mine" },
];

/** Photo above the moods (portrait 4:5). Until the file is in public/, a soft empty frame shows instead. */
export const moodPortrait = {
  src: "/assets/miss-joo-portrait.webp",
  caption: "I'm Miss Joo. I write the things we don't post.",
};
