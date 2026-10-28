import type { ReactNode } from "react";
import { postcard } from "@/data/quiz";
import { fill } from "@/data/suitcase";

/** Longest name the card and the share link accept */
export const POSTCARD_NAME_MAX = 40;
/** Longest custom message */
export const POSTCARD_NOTE_MAX = 200;

/** Share link for a postcard: both names and the message ride in the query string, nothing is stored. */
export const postcardLink = (name: string, from: string, message: number, note: string) => {
  const params = new URLSearchParams({
    to: name.trim().slice(0, POSTCARD_NAME_MAX),
    from: from.trim().slice(0, POSTCARD_NAME_MAX),
    m: String(message),
  });
  if (note.trim()) params.set("note", note.trim().slice(0, POSTCARD_NOTE_MAX));
  return `${window.location.origin}/postcard?${params}`;
};

/** Reads a share link back. Anything unexpected falls back to the first message, "you" and no sender. */
export const readPostcardLink = (search: string) => {
  const params = new URLSearchParams(search);
  const m = Number(params.get("m"));
  return {
    name: (params.get("to") ?? "").trim().slice(0, POSTCARD_NAME_MAX),
    from: (params.get("from") ?? "").trim().slice(0, POSTCARD_NAME_MAX),
    note: (params.get("note") ?? "").trim().slice(0, POSTCARD_NOTE_MAX),
    message: Number.isInteger(m) && m >= 0 && m < postcard.messages.length ? m : 0,
  };
};

interface PostcardCardProps {
  name: string;
  /** Sender's name, in "From {name}, with love". Left empty, that line is left off. */
  from: string;
  message: number;
  /** Custom message; when filled in, it takes the place of the chosen one */
  note: string;
  /** Bottom of the card, such as the share button */
  children?: ReactNode;
}

/** One-sided postcard: Doha skyline on the left, the note on the right, the site name top right, a footer for a button. */
const PostcardCard = ({ name, from, message, note, children }: PostcardCardProps) => (
  <div className="w-full overflow-hidden rounded-[3px] border border-journal-border bg-journal-card text-left shadow-[0_8px_30px_-10px_rgba(0,0,0,0.35)]">
    <div className="grid sm:grid-cols-2">
      <div className="flex items-center bg-[#1d1814]">
        <img
          src="/assets/postcard-skyline.webp"
          alt="Line drawing of the Doha skyline at night, with a dhow on the water"
          width={600}
          height={345}
          className="block w-full h-auto"
        />
      </div>
      <div className="relative flex flex-col justify-center px-6 pt-8 pb-6 sm:pl-7 sm:pr-6 sm:border-l sm:border-dashed sm:border-journal-border">
        <span className="absolute top-4 right-5 font-serif text-sm font-semibold tracking-[0.08em] text-journal-gold">
          {postcard.logo}
        </span>
        <p className="mt-4 font-serif italic text-xl text-journal-text">Dear {name || "you"},</p>
        <p className="mt-3 whitespace-pre-line break-words font-serif text-lg leading-relaxed text-journal-text-secondary">
          {note || postcard.messages[message]}
        </p>
        {from && <p className="mt-4 font-serif italic text-base text-journal-gold">{fill(postcard.from, { name: from })}</p>}
      </div>
    </div>
    {children && <div className="border-t border-journal-border px-6 py-4 text-center">{children}</div>}
  </div>
);

export default PostcardCard;
