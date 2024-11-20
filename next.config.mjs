import createNextIntlPlugin from "next-intl/plugin";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.giahine.com", // if your website has no www, drop it
        port: "",
      },
      {
        protocol: "http",
        port: "3000",
        hostname: "localhost",
      },
      {
        protocol: "https",
        port: "",
        hostname: "new.giahine.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "blog.giahine.com",
      },
      {
        protocol: "https",
        hostname: "cdn.timobio.com", // if your website has no www, drop it
        port: "",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
