/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false }; // Prevents Next.js from bundling `fs`
        return config;
    },
};

export default nextConfig;
