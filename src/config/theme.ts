import { DefaultTheme } from "styled-components";
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

export const theme: DefaultTheme = {
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
            tight: "-0.03em",
            normal: "0",
            wide: "0.05em",
        },
    },
};
