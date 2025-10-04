import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import { theme, noto } from "@/config/theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${noto.style.fontFamily};
                }
            `}</style>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
