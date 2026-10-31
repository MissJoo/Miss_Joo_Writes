// "Today's note" on the homepage: each time it's opened, one of these lines at random, taken from the essays.
// Add, remove or reorder lines freely. Keep each one short enough to read in a breath.
export const dailyNotes: string[] = [
  "Ready rarely comes first. It usually shows up halfway through.",
  "You're not too much. You've just stopped settling for too little.",
  "Busy is motion. Building is direction.",
  "A choice gets made again and again, especially on the days it's hard.",
  "You only need to show up as the person you are today.",
  "Unfinished does not mean unready.",
  "Someone else's timing does not make yours wrong.",
  "The changes that matter most happen quietly. One ordinary day at a time.",
  "Strength can be quiet.",
  "Sometimes letting go is finally getting yourself back.",
  "You deserve a love that does not make you feel alone in the effort.",
  "Being needed and being known are not the same thing.",
  "Maybe home is also every place that changes you for the better.",
  "You don't have to abandon yourself to make a room more comfortable.",
  "You do not have to be the only one carrying it.",
  "Armor is brilliant for surviving. It is terrible for being close to anyone.",
  "I just want to stop walking into each new year by accident.",
  "You can miss something and still know it is time to go.",
  "Kindness does not require self-erasure.",
  "Some of the clearest things I know about myself, I learned in the quiet.",
  "You're not losing yourself. You're collecting yourself.",
  "It mattered. And you can still set it down.",
  "Nothing happened. And it was enough.",
];

const LAST_NOTE_KEY = "mj_last_note";

/** A random note, never the same one the reader saw last time (remembered for this browser tab only). */
export const randomNote = () => {
  let last = -1;
  try {
    last = Number(sessionStorage.getItem(LAST_NOTE_KEY) ?? -1);
  } catch {
    // Storage blocked: a repeat is possible, nothing else changes
  }
  let index = Math.floor(Math.random() * dailyNotes.length);
  if (index === last) index = (index + 1) % dailyNotes.length;
  try {
    sessionStorage.setItem(LAST_NOTE_KEY, String(index));
  } catch {
    // See above
  }
  return dailyNotes[index];
};
