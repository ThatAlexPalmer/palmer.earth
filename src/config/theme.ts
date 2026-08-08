const space = (n: number) => `${n * 4}px`;
export const theme = {
    colors: {
        background: "#08080a",
        text: "#dcdcdc",
        accent: "#a32d15",
        accentHover: "#d94a2e",
        g12: "rgba(255,255,255,0.12)",
        g60: "rgba(255,255,255,0.60)",
        g68: "rgba(255,255,255,0.68)",
        g76: "rgba(255,255,255,0.76)",
        g90: "rgba(255,255,255,0.90)",
        status: {
            live: "#f0a93b",
            work: "#e8e3d9",
            oss: "#93a4ad",
        },
        statusEdge: {
            live: "rgba(240,169,59,0.45)",
            work: "rgba(232,227,217,0.38)",
            oss: "rgba(147,164,173,0.45)",
        },
        feedback: {
            ok: "#f0a93b",
            error: "#d94a2e",
        },
        form: {
            surface: "rgba(255,255,255,0.06)",
            surfaceHover: "rgba(255,255,255,0.10)",
            border: "rgba(255,255,255,0.22)",
            borderHover: "rgba(255,255,255,0.38)",
            buttonText: "#f5f5f5",
            disabledSurface: "rgba(163,45,21,0.55)",
            disabledBorder: "rgba(217,74,46,0.45)",
        },
        overlay: {
            surface: "#0d0d10",
            border: "rgba(255,255,255,0.18)",
        },
    },
    typography: {
        fontFamily: "var(--font-body)",
        headingFont: "var(--font-heading)",
        monoFont: "var(--font-mono)",
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
            heading: "2.25rem",
            headingMobile: "1.45rem",
            paragraph: "1.125rem",
            paragraphMobile: "1rem",
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
        base: "180ms cubic-bezier(0.22, 1, 0.36, 1)",
        link: "color 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        bracket: "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
    },
    layout: {
        pageMaxWidth: "1200px",
        headlineWidth: "28rem",
        headlineWidthMobile: "18rem",
        contentMaxWidth: "696px",
        heroGap: "6rem",
        heroGapMobile: "3rem",
    },
    effects: {
        bracketSize: "10px",
        bracketThickness: "1px",
        bracketInset: "4px",
        bracketOffset: "4px",
        glowCore: "1px",
        glowHalo: "4px",
        badgeFlickerDuration: "6s",
    },
    layers: {
        slab: 2,
        popover: 50,
    },
    space,
    radius: {
        sm: "2px",
    },
};

export type Theme = typeof theme;
