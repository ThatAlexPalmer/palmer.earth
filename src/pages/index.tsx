import Head from "next/head";
import { Container, Main, H1, Nav, H2, StylizedHeading, RedBlock, P, Footer } from "../components/mainstyles";
import Script from "next/script";

export default function Home() {
	return (
		<Container>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
				<title>Alex Palmer</title>
				<meta name="author" content="Alex Palmer" />
				<meta
					name="description"
					content="Head of Product at Plume Network. Built Transfer Agent Protocol - open source infrastructure for tokenized capital markets. Former dir. of product at Lienfluent, Bettermode. Led product for Bayer, Merck, Eli Lilly."
				/>

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Alex Palmer" />
				<meta property="og:url" content="https://palmer.earth" />
				<meta property="og:title" content="Alex Palmer" />
				<meta
					property="og:description"
					content="Head of Product at Plume Network. Built Transfer Agent Protocol - open source infrastructure for tokenized capital markets. Former dir. of product at Lienfluent, Bettermode. Led product for Bayer, Merck, Eli Lilly."
				/>
				<meta property="og:image" content="https://palmer.earth/og-avatar-v4.jpg" />
				<meta property="og:image:type" content="image/jpg" />
				<meta property="og:image:width" content="279" />
				<meta property="og:image:height" content="279" />

				<meta name="theme-color" content="#161414" />
				<link rel="canonical" href="https://palmer.earth" />
				<link rel="manifest" href="/site.webmanifest" />

				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#161414" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#161414" />
				<meta name="msapplication-TileColor" content="#161414" />
				<noscript>
					If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>. Please{" "}
					<strong>enable JS</strong> to make this website work. If you're not sure how to do that, you can go to{" "}
					<a href="https://www.enable-javascript.com/">https://www.enable-javascript.com/</a> for a quick reminder!
				</noscript>
			</Head>
			<Main>
				<Nav>
					<H1>Alex Palmer</H1>
					<span className="controls">
						<a href="https://warpcast.com/thatalexpalmer.eth" target="_blank">Farcaster</a>
						<a href="https://twitter.com/thatalexpalmer" target="_blank">X</a>
					</span>
				</Nav>
				<RedBlock>
					<StylizedHeading>— Focused on tech that builds bridges, not chasms.</StylizedHeading>
				</RedBlock>
				<H2>— Productizing RWAfi on Plume.</H2>
				<P>
					Onboarding tokenized RWAs onto public blockchains in a compliant way. Head of Product at <a href="https://plumenetwork.xyz">Plume</a>, an L2 built for the rapid adoption of real world assets. Built <a href="https://transferagentprotocol.xyz" target="_blank">Transfer Agent Protocol</a>, open source infrastructure for tokenized capital markets which runs natively on it. 2x founder before that. Former dir. of product at <a href="https://lienfluent.com">Lienfluent</a>, and <a href="https://bettermode.com">Bettermode</a>.
				</P>
				<P>
					A few of my strong beliefs are: people are always more important than software; cynicism pays no dividends; one should always reason from the fundamental principles; and, "questions are places in the mind where answers fit". Clayton Christensen said that and I never forgot.
				</P>
			</Main>
			<Footer>
				<a href="https://github.com/thatalexpalmer" target="_blank">GitHub</a>
				<a href="https://paragraph.xyz/@thatalexpalmer" target="_blank">Paragraph</a>
				<a href="https://linkedin.com/in/thatalexpalmer" target="_blank">LinkedIn</a>
			</Footer>
		</Container>
	);
}
