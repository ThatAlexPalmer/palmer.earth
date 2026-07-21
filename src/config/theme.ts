import { Oswald, Noto_Sans, IBM_Plex_Mono } from "next/font/google";

export const oswald = Oswald({
    weight: ["400", "600", "700"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
});

export const noto = Noto_Sans({
    weight: ["300", "400", "500", "600"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
});

export const plexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
    variable: "--font-mono",
});

/** 4px base spacing scale */
const space = (n: number) => `${n * 4}px`;

export const theme = {
    colors: {
        background: "#08080a",
        text: "#dcdcdc",
        accent: "#a32d15",
        g04: "rgba(255,255,255,0.04)",
        g08: "rgba(255,255,255,0.08)",
        g12: "rgba(255,255,255,0.12)",
        g20: "rgba(255,255,255,0.20)",
        g40: "rgba(255,255,255,0.40)",
        g60: "rgba(255,255,255,0.60)",
        g68: "rgba(255,255,255,0.68)",
        g76: "rgba(255,255,255,0.76)",
        g90: "rgba(255,255,255,0.90)",
        // atmospheric wash (accent at low alpha — used in global bg)
        glow: "rgba(163, 45, 21, 0.14)",
        glowSoft: "rgba(163, 45, 21, 0.06)",
        haze: "rgba(255, 255, 255, 0.025)",
    },
    typography: {
        fontFamily: noto.style.fontFamily,
        headingFont: oswald.style.fontFamily,
        monoFont: plexMono.style.fontFamily,
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        fontSize: {
            xs: "0.6875rem",
            sm: "0.75rem",
            md: "0.875rem",
            heading: "2.5rem",
            headingMobile: "1.6rem",
            paragraph: "1.3rem",
            paragraphMobile: "1rem",
            uiCopy: "1.5rem",
            uiCopyMobile: "1rem",
        },
        lineHeight: {
            heading: "1.3",
            paragraph: "1.6",
        },
        letterSpacing: {
            normal: "0",
            wide: "0.05em",
            mono: "0.06em",
        },
    },
    breakpoints: {
        phone: "512px",
        tablet: "768px",
        smallLaptop: "820px",
    },
    transitions: {
        fast: "120ms ease-in-out",
        base: "180ms cubic-bezier(0.22, 1, 0.36, 1)",
        link: "color 120ms ease-in-out, text-underline-offset 120ms ease-in-out",
    },
    layout: {
        containerMaxWidth: "1200px",
        mainMaxWidth: "1600px",
        headlineWidth: "24rem",
        headlineWidthMobile: "16rem",
        contentMaxWidth: "696px",
        footerHeight: "8rem",
    },
    space,
    radius: {
        none: "0",
        sm: "2px",
        md: "4px",
    },
};

export type Theme = typeof theme;
