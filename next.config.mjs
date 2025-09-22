// next.config.mjs
const REPO = process.env.NEXT_PUBLIC_REPO || 'car';
const isPagesBuild = process.env.GITHUB_PAGES === 'true'; // set only in GH Actions

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
