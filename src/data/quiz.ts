import type { SuitcaseIcon } from "./suitcase";

// "Which letter are you?" on the homepage. Each answer points to one of the six Suitcase letters
// (photo, coffee, jacket, phone, ticket, notebook); the result shows that letter's title and question
// from src/data/suitcase.ts. The letter picked most often wins; on a tie, the earliest question decides.
export interface QuizQuestion {
  question: string;
  answers: { text: string; letter: SuitcaseIcon }[];
}

export const quiz = {
  label: "A little quiz",
  heading: "Which letter are you?",
  resultLabel: "Your letter",
  open: "Open the suitcase",
  again: "Try again",
  questions: [
    {
      question: "On a hard day, what do you reach for first?",
      answers: [
        { text: "A voice from home", letter: "photo" },
        { text: "Something that tastes like home", letter: "coffee" },
        { text: "A blank page", letter: "notebook" },
      ],
    },
    {
      question: "What still surprises you about the life you built?",
      answers: [
        { text: "How much I packed for a life I don't live", letter: "jacket" },
        { text: "How often I do the time-zone math", letter: "phone" },
        { text: "How brave I was to leave at all", letter: "ticket" },
      ],
    },
    {
      question: "What do you most need to hear today?",
      answers: [
        { text: "You can stop waiting for the seasons to change", letter: "jacket" },
        { text: "Let today be only about here", letter: "phone" },
        { text: "You already did the bravest part", letter: "ticket" },
      ],
    },
  ] as QuizQuestion[],
};

/** Letter for a set of answers (one letter per question, in order). */
export const quizResult = (picks: SuitcaseIcon[]): SuitcaseIcon => {
  const counts = new Map<SuitcaseIcon, number>();
  for (const letter of picks) counts.set(letter, (counts.get(letter) ?? 0) + 1);
  const best = Math.max(...counts.values());
  return picks.find((letter) => counts.get(letter) === best)!;
};

// "Send a postcard" below the quiz. Nothing is stored or sent: the text is built and copied to the clipboard.
export const postcard = {
  label: "Send a postcard",
  heading: "Miss someone far away?",
  line: "Send them a postcard from Doha. Free, and it takes ten seconds.",
  nameLabel: "Their name",
  namePlaceholder: "e.g. Ate Rose",
  messagesLabel: "Your message",
  /** The first one is chosen to start with */
  messages: [
    "Thinking of you, wherever you are tonight.",
    "I opened a suitcase today and thought of you.",
    "For the one who left home too. This one's for you.",
  ],
  link: "missjoowrites.com/the-suitcase",
  create: "Create postcard",
  copied: "Copied. Paste it in a message to them.",
  copyFallback: "Select the text below and copy it.",
  /** {name}, {message} and {link} are filled in */
  template: "Dear {name},\n\n{message}\n\n{link}",
};

// The three boxes under the postcard. href starting with "http" opens in a new tab.
export const moreBoxes = [
  {
    title: "The Curated Edit",
    line: "Beauty, places, pieces, and little moments worth remembering.",
    link: "Explore The Edit",
    href: "/lifestyle",
  },
  {
    title: "From the Feed",
    line: "Small moments shared on social, and the longer essays behind them.",
    link: "Follow @missjooo98",
    href: "https://www.instagram.com/missjooo98/",
  },
  {
    title: "Free Journal",
    line: "Notes on Becoming, a gentle reflection journal for women learning to slow down.",
    link: "Get the journal",
    href: "/downloads",
  },
];
