// Utility to handle basePath for GitHub Pages deployment
export function getBasePath(): string {
  // Use the same logic as next.config.mjs for consistency
  const REPO = process.env.NEXT_PUBLIC_REPO || 'car';
  const isPagesBuild = process.env.GITHUB_PAGES === 'true';
  
  // In production with GitHub Pages, we need to account for the basePath
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      return `/${REPO}`;
    }
  }
  
  // Server-side or local development
  return isPagesBuild ? `/${REPO}` : '';
}

export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // Ensure path starts with / and doesn't have double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
