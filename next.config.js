/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "https://firebasestorage.googleapis.com/v0/b/next-facebook-7830a.appspot.com/o/profiles",
    ],
  },
  
};
