const files = new Set(__PUBLIC_FILES__);

/** True when `path` (e.g. "/assets/feed/qatar-days.webp") was in public/ when the site was built. */
export const publicFileExists = (path: string | undefined): path is string => !!path && files.has(path.split(/[?#]/)[0]);
