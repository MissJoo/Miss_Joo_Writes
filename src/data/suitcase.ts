// All the words for "The Suitcase" (/the-suitcase). Edit freely; the game reads everything from here.
// Placeholders in curly braces, like {name}, are filled in by the game.
import type { PillarSlug } from "./pillars";

export type SuitcaseIcon = "photo" | "coffee" | "jacket" | "phone" | "ticket" | "notebook";

export interface SuitcaseItem {
  id: SuitcaseIcon;
  /** Name on the item button, repack row and boarding pass */
  name: string;
  title: string;
  lead: string;
  body: string;
}

export interface SuitcaseLetter {
  title: string;
  body: string[];
  ask: string;
}

export interface SuitcaseResult {
  title: string;
  line: string;
}

export const suitcase = {
  /** Topic hub that features the game, and whose essays end with a link to it */
  pillar: "life-in-qatar" as PillarSlug,

  page: {
    eyebrow: "Life in Qatar · An interactive reflection",
    titleBefore: "The",
    titleEmphasis: "Suitcase",
    intro:
      "Everyone who moves abroad arrives with one suitcase and slowly finds out what was really inside it. Open yours. Take each thing out, one at a time, and see what it still means to you.",
  },

  intro: {
    heading: "Start with whatever your hand reaches first.",
    body: "There are six things inside. Each one holds a small memory of leaving and of staying. Tap an item to take it out.",
    sign: "Until the next page, Miss Joo",
  },

  items: [
    {
      id: "photo",
      name: "A family photo",
      title: "The photo by my bed",
      lead: "The first months, I looked at it every night.",
      body: "Now there are days I forget it is there. I still cannot decide if that means I am healing, or only getting used to the distance.",
    },
    {
      id: "coffee",
      name: "Coffee from home",
      title: "The coffee from home",
      lead: "It never tastes the same here.",
      body: "Maybe it is the water. Maybe it is me. Some things you bring with you only taste right in the kitchen they came from.",
    },
    {
      id: "jacket",
      name: "A winter jacket",
      title: "The jacket I never wear",
      lead: "I packed it for a life that has seasons.",
      body: "It has stayed folded since the day I arrived. Not everything you bring is meant to be used. Some things are only there to remind you who you were planning for.",
    },
    {
      id: "phone",
      name: "Two clocks",
      title: "Two time zones on one screen",
      lead: "I still do the math before every call home.",
      body: "Living abroad means quietly choosing when to be awake for the people you love. Nobody tells you how much of your love becomes arithmetic.",
    },
    {
      id: "ticket",
      name: "A one-way ticket",
      title: "The one-way ticket",
      lead: "I did not know how much courage could fit on such a small piece of paper.",
      body: "Some days I forget that I am the woman who bought it. I keep it so I can remember.",
    },
    {
      id: "notebook",
      name: "My old plans",
      title: "The notebook of plans",
      lead: "Half of what I wrote before I left has changed.",
      body: "The woman who wrote those pages would not recognise some of my days now. I think she would be proud of the ones she did not plan.",
    },
  ] as SuitcaseItem[],

  unpack: {
    takeOut: "Take out",
    unpacked: "Unpacked",
    ariaTakeOut: "Take out: {name}",
    ariaReadAgain: "Read again: {name}",
    counter: "{opened} of {total} unpacked",
    moreInside: "{remaining} more inside.",
    emptyBold: "The suitcase is empty.",
    emptyRest: "Something was tucked underneath.",
    readLetter: "Read your letter",
    repack: "Repack the suitcase",
  },

  envelope: {
    hint: "A letter was tucked under the {name}.",
    peekLine1: "For you,",
    peekLine2: "the one who stayed.",
    postmarkLine1: "Doha",
    postmarkLine2: "Qatar",
    sealLabel: "Break the seal and open the letter",
    tapHint: "Tap the seal to open",
  },

  letter: {
    eyebrow: "A note from Miss Joo",
    close: "Close",
    signLine1: "Until the next page,",
    signLine2: "Miss Joo",
    repack: "Repack the suitcase",
  },

  /** One letter per item. The reader receives the letter for whichever item she unpacked last. */
  letters: {
    photo: {
      title: "You saved the people for last.",
      body: [
        "Maybe because they are the hardest thing to unpack. The faces in that photo are still part of how you became you, even from this far away.",
        "Missing them does not mean you chose wrong. It means you loved well before you left.",
      ],
      ask: "Who in that photo have you not called in a while?",
    },
    coffee: {
      title: "You kept the taste of home until the end.",
      body: [
        "Some comforts do not travel well. They only taste right in the kitchen they came from.",
        "So find one small ritual here that is yours. Not a replacement for home. Just something that tells you that you live here too.",
      ],
      ask: "What is one small ritual that already feels like yours here?",
    },
    jacket: {
      title: "The last thing out was the jacket you never wear.",
      body: [
        "Some of what we pack is for a life we imagined. The weather here never asked for it, and that is alright.",
        "You do not have to throw it away. You only have to stop waiting for the seasons to change.",
      ],
      ask: "What are you still holding onto for a life you are no longer living?",
    },
    phone: {
      title: "Two clocks, at the very bottom.",
      body: [
        "You have been living in two time zones for a while now. Counting forward, counting back, staying awake for the people you love.",
        "Tonight, let yourself be fully in one place. The one you are standing in.",
      ],
      ask: "When did you last let a day here be only about here?",
    },
    ticket: {
      title: "The one-way ticket was the last thing inside.",
      body: [
        "Keep it somewhere you can see it.",
        "On the days you feel small in this new life, remember that you already did the bravest part. You left.",
      ],
      ask: "What would the woman who bought that ticket say to you today?",
    },
    notebook: {
      title: "Your old plans were waiting at the bottom.",
      body: [
        "Half of them changed. Some quietly, some all at once.",
        "Open the notebook tonight and write one new line. Not a plan. Just one honest sentence about who you are now.",
      ],
      ask: "What is the one sentence you would write?",
    },
  } as Record<SuitcaseIcon, SuitcaseLetter>,

  repack: {
    eyebrow: "Repacking",
    heading: "What do you still carry?",
    body: "Not everything has to go back in. Choose honestly.",
    carry: "Carry",
    leave: "Leave",
    done: "Close the suitcase",
  },

  /** Result depends on how many items the reader carries */
  results: {
    /** Carrying at least this many */
    fullFrom: 5,
    full: {
      title: "You carry home with you.",
      line: "Some women travel light. You travel full, and that is its own kind of strength. Just leave a little room for the woman you are becoming.",
    },
    /** Carrying at most this many */
    lightUpTo: 2,
    light: {
      title: "You are learning to travel light.",
      line: "You have made peace with leaving some things behind. That is not forgetting. It is trusting that what matters already lives in you.",
    },
    between: {
      title: "You are somewhere in between.",
      line: "Half of you is still unpacking, half of you is already home. That in-between is where most of us who live abroad actually live.",
    },
  } as { fullFrom: number; full: SuitcaseResult; lightUpTo: number; light: SuitcaseResult; between: SuitcaseResult },

  closed: {
    eyebrow: "Closed",
    heading: "Your suitcase is packed.",
    body: "Your boarding pass is below.",
    again: "Unpack again",
  },

  pass: {
    label: "Boarding pass",
    brand: "Miss Joo Writes",
    fromLabel: "From",
    from: "Where you began",
    toLabel: "To",
    to: "Who you are becoming",
    carryingLabel: "Still carrying",
    leftLabel: "Left behind",
    nothing: "nothing",
    gateLabel: "Gate",
    gate: "DOH",
    seatLabel: "Seat",
    seat: "Window, always",
    copy: "Copy my pass",
    copied: "Copied. Paste it anywhere.",
    copyFallback: "Select the text and copy it.",
    copyTextLabel: "Your pass as text",
    save: "Save as image",
    saving: "Saving…",
    saved: "Saved. Share it to your Story.",
    saveFailed: "Could not save the image. Try a screenshot instead.",
    imageSite: "missjoowrites.com",
    shareText:
      "The Suitcase, by Miss Joo\n\n{title}\n{line}\n\nI still carry: {kept}\nI left behind: {left}\n\nOpen yours: missjoowrites.com",
  },

  keepReading: {
    eyebrow: "Keep reading",
    /** Essay slugs from src/data/posts.ts; titles come from the posts */
    essays: ["things-i-never-expected-to-miss", "parts-of-myself-i-changed-to-fit-in", "outgrow-the-places-that-once-held-you"],
  },

  /** Homepage teaser */
  teaser: {
    heading: "The Suitcase",
    line: "Open it. See what you still carry.",
    button: "Open the suitcase",
  },

  /** Featured block on the topic hub */
  hubFeature: {
    heading: "Play: The Suitcase",
    line: "An interactive reflection on living abroad.",
    button: "Open the suitcase",
  },

  /** Line at the end of every essay in the pillar above */
  postLine: {
    before: "Living abroad too?",
    link: "Open the suitcase.",
  },
};

/** Fills {placeholders} in a template string. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
