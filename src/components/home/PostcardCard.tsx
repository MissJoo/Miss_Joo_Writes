import type { ReactNode } from "react";
import { postcard } from "@/data/quiz";

/** Longest name the card and the share link accept */
export const POSTCARD_NAME_MAX = 40;

/** Share link for a postcard: the name and message number ride in the query string, nothing is stored. */
export const postcardLink = (name: string, message: number) => {
  const params = new URLSearchParams({ to: name.trim().slice(0, POSTCARD_NAME_MAX), m: String(message) });
  return `${window.location.origin}/postcard?${params}`;
};

/** Reads a share link back. Anything unexpected falls back to the first message and "you". */
export const readPostcardLink = (search: string) => {
  const params = new URLSearchParams(search);
  const m = Number(params.get("m"));
  return {
    name: (params.get("to") ?? "").trim().slice(0, POSTCARD_NAME_MAX),
    message: Number.isInteger(m) && m >= 0 && m < postcard.messages.length ? m : 0,
  };
};

interface PostcardCardProps {
  name: string;
  message: number;
  /** Bottom of the card, such as the share button */
  children?: ReactNode;
}

/** One-sided postcard: Doha skyline on the left, the note on the right, logo top right, a footer for a button. */
const PostcardCard = ({ name, message, children }: PostcardCardProps) => (
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
        <img
          src="/miss-joo-favicon.png"
          alt={postcard.logoAlt}
          width={44}
          height={44}
          className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-[2px] border border-journal-border/70 p-1"
        />
        <p className="pr-12 font-serif italic text-xl text-journal-text">Dear {name || "you"},</p>
        <p className="mt-3 font-serif text-lg leading-relaxed text-journal-text-secondary">{postcard.messages[message]}</p>
        <p className="mt-4 font-serif italic text-base text-journal-gold">{postcard.signoff}</p>
      </div>
    </div>
    {children && <div className="border-t border-journal-border px-6 py-4 text-center">{children}</div>}
  </div>
);

export default PostcardCard;
