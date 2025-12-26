const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [32, 64, 75, 96, 128, 256],
        qualities: [70, 75],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
