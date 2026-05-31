import { Oswald, Noto_Sans } from "next/font/google";

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

export const theme = {
    colors: {
        background: "#08080a",
        text: "#dcdcdc",
        accent: "#a32d15",
    },
    typography: {
        fontFamily: noto.style.fontFamily,
        headingFont: oswald.style.fontFamily,
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        fontSize: {
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
        },
    },
    breakpoints: {
        phone: "512px",
        tablet: "768px",
        smallLaptop: "820px",
    },
    transitions: {
        fast: "120ms ease-in-out",
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
};

export type Theme = typeof theme;
