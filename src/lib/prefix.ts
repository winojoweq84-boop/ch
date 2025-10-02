/**
 * Prefix helper for GitHub Pages deployment
 * 
 * This utility helps prefix assets that Next.js doesn't automatically rewrite
 * when using basePath for GitHub Pages project sites.
 */

export const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Get a prefixed URL for static assets
 * @param path - The asset path (e.g., '/images/logo.svg')
 * @returns The prefixed path for GitHub Pages
 */
export const getPrefixedUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return prefix ? `${prefix}/${cleanPath}` : `/${cleanPath}`;
};

/**
 * Get a prefixed URL for favicon and manifest files
 * @param path - The asset path (e.g., '/favicon.ico')
 * @returns The prefixed path for GitHub Pages
 */
export const getFaviconUrl = (path: string): string => {
  return getPrefixedUrl(path);
};
