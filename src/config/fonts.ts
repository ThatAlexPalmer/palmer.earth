import { IBM_Plex_Mono, Noto_Sans, Oswald } from "next/font/google";

export const headingFont = Oswald({
    weight: ["400", "600", "700"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
    variable: "--font-heading",
});

export const bodyFont = Noto_Sans({
    weight: ["300", "400", "500", "600"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
    variable: "--font-body",
});

export const monoFont = IBM_Plex_Mono({
    weight: ["400", "500", "600"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
    variable: "--font-mono",
});
