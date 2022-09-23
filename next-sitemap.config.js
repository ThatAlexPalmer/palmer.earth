/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://palmer.earth",
    generateRobotsTxt: true, // (optional)
    exclude: ["/app*", "/_next/*"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "*",
                allow: ["/", "/login"],
                disallow: ["/app*", "/_next/*"],
            },
        ],
    },
    // ...other options
};

module.exports = config;
