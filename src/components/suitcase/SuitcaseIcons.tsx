import type { SuitcaseIcon } from "@/data/suitcase";

export const ItemIcon = ({ id }: { id: SuitcaseIcon }) => {
  switch (id) {
    case "photo":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="7" width="22" height="18" rx="1.5" />
          <path d="M8 22l5.5-6 4 4 3-3L25 22" />
          <circle cx="21" cy="12" r="1.8" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M8 12h14v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z" />
          <path d="M22 14h2a3 3 0 0 1 0 6h-2" />
          <path d="M12 5c-1 1.5 1 2.5 0 4M16 5c-1 1.5 1 2.5 0 4" />
        </svg>
      );
    case "jacket":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M12 5l4 4 4-4 6 4v17h-5V16M12 5L6 9v17h5V16" />
          <path d="M16 9v17" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="9" y="4" width="14" height="24" rx="2.5" />
          <circle cx="13" cy="14" r="2.3" />
          <circle cx="19" cy="14" r="2.3" />
          <path d="M13 12.6V14h1M19 12.6V14h1" />
          <path d="M14 24h4" />
        </svg>
      );
    case "ticket":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M5 10h22v4a2 2 0 0 0 0 4v4H5v-4a2 2 0 0 0 0-4z" />
          <path d="M20 10v12" strokeDasharray="2 2" />
          <path d="M9 14h6M9 18h4" />
        </svg>
      );
    case "notebook":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="8" y="5" width="17" height="22" rx="1.5" />
          <path d="M8 9H6M8 14H6M8 19H6M8 24H6" />
          <path d="M12 11h9M12 15h9M12 19h6" />
        </svg>
      );
  }
};

/** Closed suitcase illustration for teasers. Also the basis of public/images/the-suitcase-og.png. */
export const ClosedSuitcase = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A closed leather suitcase">
    <path d="M72 34V22a10 10 0 0 1 10-10h36a10 10 0 0 1 10 10v12" fill="none" stroke="#573925" strokeWidth="8" strokeLinecap="round" />
    <rect x="14" y="34" width="172" height="112" rx="18" fill="#7B5236" />
    <rect x="14" y="34" width="172" height="112" rx="18" fill="none" stroke="#573925" strokeWidth="3" />
    <path d="M14 82h172" stroke="#573925" strokeWidth="3" />
    <rect x="44" y="74" width="22" height="16" rx="3" fill="#C8A96A" />
    <rect x="134" y="74" width="22" height="16" rx="3" fill="#C8A96A" />
    <path d="M52 34v112M148 34v112" stroke="#573925" strokeWidth="2" opacity="0.55" />
    <rect x="86" y="104" width="40" height="26" rx="3" fill="#FDF9F4" transform="rotate(-6 106 117)" />
    <path d="M93 113h24M93 120h16" stroke="#8C6A43" strokeWidth="2" strokeLinecap="round" transform="rotate(-6 106 117)" />
  </svg>
);
