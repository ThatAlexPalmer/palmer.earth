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
    weight: ["400", "500", "600"],
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
        accentHover: "#d94a2e",
        // white-opacity gray ramp (visualizelaws-style chrome)
        g04: "rgba(255,255,255,0.04)",
        g08: "rgba(255,255,255,0.08)",
        g12: "rgba(255,255,255,0.12)",
        g20: "rgba(255,255,255,0.20)",
        g40: "rgba(255,255,255,0.40)",
        g60: "rgba(255,255,255,0.60)",
        g68: "rgba(255,255,255,0.68)",
        g76: "rgba(255,255,255,0.76)",
        g90: "rgba(255,255,255,0.90)",
        // neon status chips — brighter / higher sat for cypherpunk read
        status: {
            live: "#39ff87",
            work: "#d47bff",
            oss: "#3dd6ff",
        },
        form: {
            surface: "rgba(255,255,255,0.06)",
            border: "rgba(255,255,255,0.22)",
            borderHover: "rgba(255,255,255,0.38)",
            buttonText: "#f5f5f5",
        },
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
            xs: "0.6875rem", // 11px
            sm: "0.75rem", // 12px
            md: "0.875rem", // 14px
            // slightly smaller so "Regulatory Product Strategy" fits the slab
            heading: "2.25rem",
            headingMobile: "1.45rem",
            paragraph: "1.125rem", // 18px
            paragraphMobile: "1rem",
            uiCopy: "0.875rem",
            uiCopyMobile: "0.8125rem",
            display: "2.75rem",
            displayMobile: "1.85rem",
        },
        lineHeight: {
            heading: "1.2",
            paragraph: "1.65",
            tight: "1.3",
        },
        letterSpacing: {
            normal: "0",
            wide: "0.05em",
            mono: "0.1em",
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
        link: "color 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        bracket: "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
    },
    layout: {
        // Live-site scale so RedBlock has the same presence as production
        containerMaxWidth: "1200px",
        mainMaxWidth: "1200px",
        // wider slab for three-word title line without overflow
        headlineWidth: "28rem",
        headlineWidthMobile: "18rem",
        contentMaxWidth: "696px",
        footerHeight: "auto",
    },
    effects: {
        bracketSize: "12px",
        bracketThickness: "1px",
        bracketInset: "6px",
        badgeFlickerDuration: "4.2s",
    },
    space,
    radius: {
        none: "0",
        sm: "2px",
        md: "4px",
    },
};

export type Theme = typeof theme;
