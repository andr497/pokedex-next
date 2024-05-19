const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [32, 64, 96, 128, 256],
        
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
