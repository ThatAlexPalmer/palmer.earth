import Head from "next/head";
import { Container, Main, H1, H2, StylizedHeading, RedBlock, P, Footer } from "../components/mainstyles";

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
					content="Co-founder of Poet Network. Former director of product at Lienfluent, Bettermode. Angel investing small cheques at the earliest stages."
				/>

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Alex Palmer" />
				<meta property="og:url" content="https://palmer.earth" />
				<meta property="og:title" content="Alex Palmer" />
				<meta
					property="og:description"
					content="Co-founder of Poet Network. Former director of product at Lienfluent, Bettermode. Angel investing small cheques at the earliest stages."
				/>
				<meta property="og:image" content="https://palmer.earth/og-avatar-v4.jpg" />
				<meta property="og:image:type" content="image/jpg" />
				<meta property="og:image:width" content="279" />
				<meta property="og:image:height" content="279" />

				<meta name="theme-color" content="#ba382c" />
				<link rel="canonical" href="https://palmer.earth" />
				<link rel="manifest" href="/site.webmanifest" />

				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2d2f33" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#2d2f33" />
				<meta name="msapplication-TileColor" content="#2d2f33" />
				<noscript>
					If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>. Please{" "}
					<strong>enable JS</strong> to make this website work. If you're not sure how to do that, you can go to{" "}
					<a href="https://www.enable-javascript.com/">https://www.enable-javascript.com/</a> for a quick reminder!
				</noscript>
			</Head>
			<Main>
				<H1>Alex Palmer</H1>
				<RedBlock>
					<StylizedHeading>— I'm focused on tech that builds bridges, not chasms.</StylizedHeading>
				</RedBlock>
				<H2>— My intellectual curiosty is unambiguous human communication.</H2>
				<P>
					Co-founder of <a href="https://poet.network" target="_blank">Poet Network</a>. Investing small angel cheques at the earliest stages. Former Director of Product at <a href="https://lienfluent.com">Lienfluent</a> and <a href="https://tribe.so">Tribe</a> (now <a href="https://bettermode.com">Bettermode</a>). In the past, founded two startups and shipped first-in-class voice bot on Google Home for Bayer Pharmaceutical. I code, design, and write.
				</P>
				<P>
					A few of my strong beliefs are: people are always more important than software; cynicism pays no dividends; one should always reason from the fundamental principles; and, "questions are places in the mind where answers fit". Clayton Christensen said that and I never forgot.
				</P>
			</Main>
			<Footer>
				<a href="https://twitter.com/thatalexpalmer" target="_blank">Twitter</a>
				<a href="https://medium.com/@thatalexpalmer" target="_blank">Medium</a>
				<a href="https://nf.td/thatalexpalmer" target="_blank">NF.TD</a>
				<a href="https://linkedin.com/in/thatalexpalmer" target="_blank">LinkedIn</a>
			</Footer>
		</Container>
	);
}
