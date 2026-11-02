import { publicFileExists } from "@/lib/publicFiles";
import { cn } from "@/lib/utils";

interface EditPhotoProps {
  /** Path in public/, from src/data/edit-categories.ts */
  src: string;
  alt: string;
  className?: string;
  /** Lazy for cards further down the page; eager for the main photo of a page */
  eager?: boolean;
}

/** A portrait photo for The Edit, shown whole (2:3). Until its file exists, a labelled placeholder takes its place. */
const EditPhoto = ({ src, alt, className, eager }: EditPhotoProps) =>
  publicFileExists(src) ? (
    <img
      src={src}
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

export default EditPhoto;
