// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
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
    //   minimumCacheTTL: 2678400, // Cache images for 31 days
      minimumCacheTTL: 31536000, // Cache images for 1 year
      unoptimized: true, // Temporarily disable image optimization
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    reactStrictMode: false,
  };
  
  module.exports = withBundleAnalyzer(nextConfig);


  // const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   })

// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'firebasestorage.googleapis.com',
//                 port: '',
//                 // pathname: '/account123/**',
//             },
//         ],
//     },
//     logging: {
//         fetches: {
//             fullUrl: true,
//         },
//     },
//     // images: {
//     //     domains: ['https://firebasestorage.googleapis.com/'], // Replace with your actual domain
//     // },
//     // reactStrictMode: false,
// };

// module.exports = withBundleAnalyzer(nextConfig)