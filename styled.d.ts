import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: { background: string; text: string; accent: string };
        typography: {
            fontFamily: string;
            headingFont: string;
            fontWeight: { thin: number; normal: number; bold: number };
            fontSize: { heading: string; headingMobile: string; paragraph: string; paragraphMobile: string; uiCopy: string; uiCopyMobile: string };
            lineHeight: { heading: string; paragraph: string };
            letterSpacing: { tight: string; normal: string; wide: string };
        };
    }
}
