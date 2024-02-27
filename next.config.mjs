// next.config.js
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
    }
    // images: {
    //     domains: ['https://firebasestorage.googleapis.com/'], // Replace with your actual domain
    // },
    // reactStrictMode: false,
};

export default nextConfig;
