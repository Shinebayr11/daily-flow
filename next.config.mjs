/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mongoose ships native/optional deps that Next shouldn't try to bundle.
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
    ],
  },
};

export default nextConfig;
