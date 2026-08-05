export const siteMetadata = {
    title: "Alex Palmer",
    description:
        "Head of Regulatory Product Strategy at Plume Network. Launched Nest (now Plume Vaults) to let anyone with a wallet earn from real world assets. Building Transfer Agent Protocol to power Plume's transfer agent.",
    url: "https://palmer.earth",
    image: "https://palmer.earth/og-avatar-v4.jpg",
    // Keep in sync with theme.colors.background
    themeColor: "#08080a",
};

export const socialLinks = {
    farcaster: "https://farcaster.xyz/thatalexpalmer.eth",
    twitter: "https://twitter.com/thatalexpalmer",
    github: "https://github.com/thatalexpalmer",
    paragraph: "https://paragraph.com/@thatalexpalmer",
    linkedin: "https://linkedin.com/in/thatalexpalmer",
};

export const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Palmer",
    url: siteMetadata.url,
    image: siteMetadata.image,
    jobTitle: "Head of Regulatory Product Strategy",
    worksFor: {
        "@type": "Organization",
        name: "Plume Network",
        url: "https://plume.org",
    },
    sameAs: [socialLinks.twitter, socialLinks.github, socialLinks.linkedin, socialLinks.paragraph, socialLinks.farcaster],
    description: siteMetadata.description,
    knowsAbout: ["Blockchain", "Real World Assets", "Regulatory Strategy", "Product Development", "Web3"],
};
