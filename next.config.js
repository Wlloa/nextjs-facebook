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
};
