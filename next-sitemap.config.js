const config = {
    siteUrl: "https://palmer.earth",
    generateRobotsTxt: true,
    exclude: ["/app*", "/_next/*"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "*",
                allow: ["/"],
                disallow: ["/app*", "/_next/*"],
            },
        ],
    },
};

module.exports = config;
