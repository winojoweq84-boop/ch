// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const isPagesBuild = process.env.GITHUB_PAGES === 'true'; // set only in GH Actions

// When deploying to GitHub Pages project sites, set this to "/<repo-name>".
// For user/organization pages (username.github.io), it should be "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export for GitHub Pages builds
  output: isPagesBuild ? 'export' : undefined,
  
  // Helps with directory index on Pages
  trailingSlash: isPagesBuild ? true : false,
  
  // next/image on static hosts
  images: { unoptimized: isPagesBuild },
  
  // Prefix routes & assets in production
  basePath: isPagesBuild ? basePath : '',
  assetPrefix: isPagesBuild ? `${basePath}/` : undefined,
};

export default nextConfig;
