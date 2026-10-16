import { useState } from "react";
import { Check, Link2, Linkedin } from "lucide-react";

const WhatsAppIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
);

const XIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
}

const buttonClass =
  "inline-flex h-9 items-center gap-2 rounded-full border border-journal-border/70 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-journal-muted transition-colors duration-300 hover:border-journal-gold/60 hover:text-journal-gold";

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, icon: <WhatsAppIcon /> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <Linkedin size={14} aria-hidden="true" /> },
    { label: "X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedText}`, icon: <XIcon /> },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium">Share this essay</span>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={copyLink} className={buttonClass}>
          {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
        </button>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
