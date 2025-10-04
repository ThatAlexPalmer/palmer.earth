export const siteMetadata = {
    title: "Alex Palmer",
    description:
        "Head of Regulatory Strategy at Plume Network. Launched Nest to let anyone with a wallet earn from real world assets. Building Transfer Agent Protocol to power Plume's transfer agent.",
    url: "https://palmer.earth",
    image: "https://palmer.earth/og-avatar-v4.jpg",
    themeColor: "#08080a",
};

export const socialLinks = {
    farcaster: "https://farcaster.com/thatalexpalmer.eth",
    twitter: "https://twitter.com/thatalexpalmer",
    github: "https://github.com/thatalexpalmer",
    paragraph: "https://paragraph.xyz/@thatalexpalmer",
    linkedin: "https://linkedin.com/in/thatalexpalmer",
};

export const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Palmer",
    url: siteMetadata.url,
    image: siteMetadata.image,
    jobTitle: "Head of Regulatory Strategy",
    worksFor: {
        "@type": "Organization",
        name: "Plume Network",
        url: "https://plume.org",
    },
    sameAs: [socialLinks.twitter, socialLinks.github, socialLinks.linkedin, socialLinks.paragraph, socialLinks.farcaster],
    description: siteMetadata.description,
    knowsAbout: ["Blockchain", "Real World Assets", "Regulatory Strategy", "Product Development", "Web3"],
};
