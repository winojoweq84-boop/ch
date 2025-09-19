// Utility to handle basePath for GitHub Pages deployment
export function getBasePath(): string {
  // In production with GitHub Pages, we need to account for the basePath
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      return '/car';
    }
  }
  
  // Server-side or local development
  const isPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production';
  return isPages ? '/car' : '';
}

export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // Ensure path starts with / and doesn't have double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
