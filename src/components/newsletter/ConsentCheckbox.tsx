import { forwardRef, type InputHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const CONSENT_REQUIRED = "Please tick the box to agree to the Terms and Privacy Policy.";

const linkClass = "underline underline-offset-2 hover:text-journal-gold transition-colors";

interface ConsentCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/** Required before any signup. beehiiv's own terms are covered in the site's Privacy Policy and Terms, which this links to. */
const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(({ id, className, ...props }, ref) => (
  <div className={cn("flex items-start gap-2.5 text-left", className)}>
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className="mt-0.5 !h-4 !w-4 shrink-0 cursor-pointer rounded-sm border-journal-border accent-[rgb(var(--journal-gold))]"
      {...props}
    />
    <label htmlFor={id} className="text-[11px] leading-relaxed text-journal-text-secondary font-sans cursor-pointer">
      I agree to receive emails from Miss Joo Writes and accept the{" "}
      <Link to="/terms" className={linkClass}>Terms</Link> and{" "}
      <Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link>.
    </label>
  </div>
));
ConsentCheckbox.displayName = "ConsentCheckbox";

export default ConsentCheckbox;
