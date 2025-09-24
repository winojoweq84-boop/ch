// next.config.mjs
const REPO = process.env.NEXT_PUBLIC_REPO || 'car';
const isPagesBuild = process.env.GITHUB_PAGES === 'true'; // set only in GH Actions

<<<<<<< HEAD
// Environment configuration
process.env.NEXT_PUBLIC_SHOW_CRYPTO_COPY = process.env.NEXT_PUBLIC_SHOW_CRYPTO_COPY || 'false';

=======
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
export default {
  // Use static export only for GitHub Pages builds
  output: isPagesBuild ? 'export' : undefined,

  // GitHub Pages can't run the image optimizer
  images: { unoptimized: isPagesBuild },

  // Serve assets from /car on Pages
  basePath: isPagesBuild ? `/${REPO}` : '',
  assetPrefix: isPagesBuild ? `/${REPO}/` : '',

  // Needed for Pages routing; not needed locally
  trailingSlash: isPagesBuild,
};
