export interface Mood {
  /** Text on the pill button */
  label: string;
  /** Slug of the essay in src/data/posts.ts */
  essay: string;
}

// "Read by How You Feel" on the homepage. The first mood is selected on load.
// To change a pairing or add a mood, edit this list; title, excerpt and reading time come from the post.
export const moods: Mood[] = [
  { label: "Tired of holding it together", essay: "emotionally-tired" },
  { label: "Outgrowing something", essay: "outgrow-the-places-that-once-held-you" },
  { label: "Starting over", essay: "new-beginnings" },
  { label: "Looking for peace", essay: "what-peace-taught-me" },
  { label: "Far from home", essay: "things-i-never-expected-to-miss" },
];
