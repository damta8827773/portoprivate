/**
 * Content records store image paths as "assets/img/foo.png" (the legacy HTML
 * convention) while the public folder serves them from "/assets/img/foo.png".
 * Absolute URLs are passed through untouched.
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path) || path.startsWith('/')) return path;
  return `/${path.replace(/^\.?\//, '')}`;
}
