// next.config.mjs
const REPO = process.env.NEXT_PUBLIC_REPO || 'car';
const isPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production';

export default {
  // GitHub Pages needs static files:
  output: 'export',
  images: { unoptimized: true }, // avoid next/image loader on Pages
  // Serve under /car on Pages:
  basePath: isPages ? `/${REPO}` : '',
  assetPrefix: isPages ? `/${REPO}/` : '',
  trailingSlash: true, // ensures /about/index.html works on Pages
};
