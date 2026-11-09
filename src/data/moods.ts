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

/** Every essay under its feeling, for the "Continue with this feeling" box inside essays. */
const essaysByFeeling: Record<string, string[]> = {
  "Tired of holding it together": ["strong-days", "emotionally-tired", "behind-every-role-there-is-a-soul", "busy-vs-building", "being-needed-and-being-known", "quiet-pressure-figured-out", "gratitude-for-me", "slow-down", "midnight-conversations"],
  "Outgrowing something": ["outgrow-the-places-that-once-held-you", "no-longer-that-version", "no-longer-waiting-to-become-her", "woman-im-slowly-becoming", "dont-need-to-prove", "quiet-shifts", "version-of-me"],
  "Starting over": ["september-feels-like-a-second-new-year", "growing-through-change", "what-i-am-choosing-now", "enter-bigger-rooms-before-i-feel-ready", "stopped-waiting", "spring-before-ready", "trust-myself", "behind-guilt", "new-beginnings"],
  "Looking for peace": ["what-peace-taught-me", "embrace-quiet-moments", "fighting-vs-forcing-love", "what-peace-looks-like", "quiet-monday", "softness-not-weakness", "enjoy-without-guilt", "my-own-company", "no-force", "calm-me", "selective-energy", "art-of-letting-go"],
  "Far from home": ["the-armor-i-built", "letters-never-sent", "things-i-never-expected-to-miss", "qatar-days-filipina", "random-tuesday"],
  "Feeling like too much": ["stopped-shrinking", "parts-of-myself-i-changed-to-fit-in", "my-standards-are-finally-mine", "the-black-coffee-rule", "exist-without-performing", "people-who-stay", "choose-myself"],
};

/** The feeling an essay belongs to and where to go next, never the essay itself or the one under "Keep reading". */
export const continueWithFeeling = (slug: string, nextSlug: string) => {
  const mood = moods.find((m) => essaysByFeeling[m.label]?.includes(slug));
  if (!mood) return null;
  const target = [mood.essay, mood.also, ...essaysByFeeling[mood.label]].find((s) => s !== slug && s !== nextSlug);
  return target ? { feeling: mood.label[0].toLowerCase() + mood.label.slice(1), slug: target } : null;
};

/** Photo in the homepage About Me section (portrait 4:5). It only shows once the file is in public/. */
export const moodPortrait = {
  src: "/assets/miss-joo-portrait.webp",
  caption: "I'm Miss Joo. I write the things we don't post.",
};
