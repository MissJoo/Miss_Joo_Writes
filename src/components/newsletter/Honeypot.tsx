import { forwardRef, type InputHTMLAttributes } from "react";

/** Spam trap: hidden from readers and screen readers, but bots that fill every field fill this one too. */
const Honeypot = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
    <label>
      Company
      <input ref={ref} type="text" name="company" tabIndex={-1} autoComplete="off" {...props} />
    </label>
  </div>
));
Honeypot.displayName = "Honeypot";

export default Honeypot;
