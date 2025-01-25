import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../components/globalstyles";
import { Noto_Sans } from 'next/font/google';
import { Oswald } from 'next/font/google';

const noto = Noto_Sans({
	weight: '400',
	style: 'normal',
	display: 'swap',
	subsets: ['latin'] // Adding the subset here
});

const oswald = Oswald({
	weight: ['400', '700'],
	style: 'normal',
	subsets: ['latin'],
});

const theme: DefaultTheme = {
	colors: {
		background: "#08080a",
		text: "#dcdcdc",
		accent: "#a32d15",
	},
	typography: {
		fontFamily: noto.style.fontFamily,
		headingFont: oswald.style.fontFamily,
		fontWeight: {
			thin: 200,
			normal: 400,
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
			wide: "0.1em",
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
