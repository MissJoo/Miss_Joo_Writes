import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PostcardConfirmationProps {
  /** Anything extra under the message, such as the Free Journal download button */
  children?: ReactNode;
  className?: string;
}

/** Shown in place of a signup form once beehiiv has the subscriber. */
const PostcardConfirmation = ({ children, className }: PostcardConfirmationProps) => (
  <div role="status" className={cn("postcard-in flex flex-col items-center gap-4 pt-2", className)}>
    <img
      src="/assets/postcard-front.jpg"
      alt="A postcard of the Doha skyline at night, signed From Doha, with love"
      width={720}
      height={480}
      className="w-full max-w-[260px] h-auto rounded-[3px] border border-journal-border shadow-md"
    />
    <p className="font-serif italic text-lg md:text-xl text-journal-text leading-snug">A postcard is on its way to your inbox.</p>
    <p className="text-xs font-sans text-journal-muted -mt-2">If you don&apos;t see it, check your Promotions or Spam folder.</p>
    {children}
  </div>
);

export default PostcardConfirmation;
