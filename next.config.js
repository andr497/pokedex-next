const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

module.exports = nextConfig;
