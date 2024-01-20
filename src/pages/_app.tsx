import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../components/globalstyles";
import { Noto_Sans } from 'next/font/google';

const noto = Noto_Sans({
	weight: '400',
	style: 'normal',
	display: 'swap',
	subsets: ['latin'] // Adding the subset here
});

const theme: DefaultTheme = {
	colors: {
		background: "#161414",
		text: "#ffffff",
		accent: "#ba382c",
	},
	typography: {
		fontFamily: noto.style.fontFamily,
		fontWeight: {
			thin: 200,
			normal: 400,
			bold: 700,
		},
		fontSize: {
			heading: "2rem",
			headingMobile: "1.2rem",
			paragraph: "1.2rem",
			paragraphMobile: "1rem",
			uiCopy: "1.2rem",
			uiCopyMobile: "1rem",
		},
	},
};

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
