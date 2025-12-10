/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    API_BASE_URL_DEV: process.env.API_BASE_URL_DEV,
    API_BASE_URL_PRO: process.env.API_BASE_URL_PRO,
    MODE: process.env.MODE,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
