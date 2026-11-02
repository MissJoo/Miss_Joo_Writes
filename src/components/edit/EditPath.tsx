import { Fragment } from "react";
import { Link } from "react-router-dom";

/** "THE EDIT / CATEGORY" path at the top of The Edit's category and story pages. Each part links back. */
const EditPath = ({ parts }: { parts: { label: string; to: string }[] }) => (
  <nav aria-label="Breadcrumb" className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-muted">
    {parts.map((part, i) => (
      <Fragment key={part.to}>
        {i > 0 && <span className="mx-2" aria-hidden="true">/</span>}
        <Link to={part.to} className="text-journal-gold hover:text-journal-text transition-colors duration-300">
          {part.label}
        </Link>
      </Fragment>
    ))}
  </nav>
);

export default EditPath;
