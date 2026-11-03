import { publicFileExists } from "@/lib/publicFiles";
import { cn } from "@/lib/utils";

interface EditPhotoProps {
  /** Path in public/, from src/data/edit-categories.ts */
  src: string;
  alt: string;
  className?: string;
  /** Lazy for cards further down the page; eager for the main photo of a page */
  eager?: boolean;
  /** Shown while `src` doesn't exist yet, e.g. the category photo standing in for a story's own photo */
  fallback?: string;
}

/**
 * A photo for The Edit. Shows `src`; until that file exists, `fallback`; failing both, a labelled placeholder.
 */
const EditPhoto = ({ src, alt, className, eager, fallback }: EditPhotoProps) => {
  const shown = publicFileExists(src) ? src : publicFileExists(fallback) ? fallback : undefined;
  return shown ? (
    <img
      src={shown}
      alt={alt}
      width={900}
      height={1350}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("block aspect-[2/3] w-full object-cover", className)}
    />
  ) : (
    <div
      role="img"
      aria-label={`${alt} (photo coming soon)`}
      className={cn(
        "flex aspect-[2/3] w-full items-center justify-center bg-journal-bg-secondary text-center",
        className,
      )}
    >
      <span className="px-6 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-muted">
        Photo coming soon
      </span>
    </div>
  );
};

export default EditPhoto;
