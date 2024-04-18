// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                // pathname: '/account123/**',
            },
        ],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    // images: {
    //     domains: ['https://firebasestorage.googleapis.com/'], // Replace with your actual domain
    // },
    // reactStrictMode: false,
};

module.exports = withBundleAnalyzer(nextConfig)
