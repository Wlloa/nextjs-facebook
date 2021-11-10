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
    domains: ['https://firebasestorage.googleapis.com/v0/b/next-facebook-7830a.appspot.com/o/profiles']
  },
  env: {
    SERVER_HOST: process.env.SERVER_HOST,
    FB_API_ID: process.env.FB_API_ID,
    FB_PROJ_ID: process.env.FB_PROJ_ID,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_STORAGE_BKT: process.env.FB_STORAGE_BKT,
    FB_MESS_ID: process.env.FB_MESS_ID,
    FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID
  }
};
