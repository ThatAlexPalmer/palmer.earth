/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    eslint: {
        dirs: ['src']
    },
};

module.exports = nextConfig;
