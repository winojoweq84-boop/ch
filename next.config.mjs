/** @type {import('next').NextConfig} */
const isGH = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

const nextConfig = {
  output: 'export',                  // next build -> static export
  images: { unoptimized: true },     // no Image Optimization on GH Pages
  trailingSlash: true,               // makes relative paths predictable
  ...(isGH && repo
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
}

export default nextConfig;
