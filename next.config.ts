const nextConfig = {
    /* config options here */
    // output: 'standalone',
    // experimental: {
    //     outputFileTracingIncludes: {
    //         '/': ['./env.local'],
    //     },
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.103',
                port: '85',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
