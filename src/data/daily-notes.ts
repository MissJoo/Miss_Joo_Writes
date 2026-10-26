// "Today's note" on the homepage. One line a day, in order; after the last one it starts again from the top.
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
];

/** The note for a given day (the reader's own calendar date), so everyone sees a new line each day. */
export const noteForDate = (date = new Date()) => {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return dailyNotes[day % dailyNotes.length];
};
