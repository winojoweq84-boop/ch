/** @type {import('next').NextConfig} */
const nextConfig = {
  // DO NOT set output: 'export' - this breaks API routes and image optimizer
  images: {
    unoptimized: false, // using Next Image Optimizer
    // domains: ['…'] // if remote images are used
  },
  // other project-specific options...
};

export default nextConfig;
