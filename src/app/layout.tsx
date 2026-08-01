import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { bodyFont, headingFont, monoFont } from "@/config/fonts";
import { siteMetadata } from "@/config/seo";

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.url),
    title: siteMetadata.title,
    description: siteMetadata.description,
    authors: [{ name: siteMetadata.title }],
    alternates: { canonical: "/" },
    manifest: "/site.webmanifest",
    openGraph: {
        type: "website",
        siteName: siteMetadata.title,
        url: siteMetadata.url,
        title: siteMetadata.title,
        description: siteMetadata.description,
        images: [{ url: siteMetadata.image, type: "image/jpeg", width: 279, height: 279 }],
    },
    icons: {
        icon: [
            { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        shortcut: "/favicon.ico",
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    appleWebApp: { title: "palmer.earth" },
};

export const viewport: Viewport = {
    themeColor: siteMetadata.themeColor,
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
            <body>
                <StyledComponentsRegistry>
                    <Providers>{children}</Providers>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
