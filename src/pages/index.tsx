import Head from "next/head";
import { Container, Main, H1, Nav, H2, RedBlock, P, Footer } from "../components/mainstyles";

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
                    content="Head of Institutional Products at Plume Network. Tokenizing yield bearing assets using Arc, letting anyone with a wallet earn from them using Nest."
                />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Alex Palmer" />
                <meta property="og:url" content="https://palmer.earth" />
                <meta property="og:title" content="Alex Palmer" />
                <meta
                    property="og:description"
                    content="Head of Institutional Products at Plume Network. Tokenizing yield bearing assets using Arc, letting anyone with a wallet earn from them using Nest."
                />
                <meta property="og:image" content="https://palmer.earth/og-avatar-v4.jpg" />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="og:image:width" content="279" />
                <meta property="og:image:height" content="279" />

                <meta name="theme-color" content="#08080a" />
                <link rel="canonical" href="https://palmer.earth" />
                <link rel="manifest" href="/site.webmanifest" />

                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="palmer.earth" />
                <noscript>
                    If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>.
                </noscript>
            </Head>
            <Main>
                <H1>Alex Palmer</H1>
                <Nav>
                    <span className="controls">
                        <a href="https://warpcast.com/thatalexpalmer.eth" target="_blank">
                            Farcaster
                        </a>
                        <a href="https://twitter.com/thatalexpalmer" target="_blank">
                            X
                        </a>
                    </span>
                </Nav>
                <RedBlock>
                    <H2>— Head of Regulatory Strategy at Plume, a public blockchain for scaling RWAs</H2>
                </RedBlock>
                <P>
                    Onboarding yield bearing assets onto public blockchains using{" "}
                    <a href="https://plumenetwork.xyz/arc" target="_blank">
                        Arc
                    </a>
                    , and letting anyone with a wallet earn from them using{" "}
                    <a href="https://nest.credit" target="_blank">
                        Nest
                    </a>
                    .
                </P>
                <P>
                    Building{" "}
                    <a href="https://transferagentprotocol.xyz" target="_blank">
                        Transfer Agent Protocol
                    </a>
                    , open source infra for tokenized cap tables. 2x founder before that. Ran payments infra, led products in pharma and AI.
                </P>
                <P>
                    A few of my strong beliefs are: technology always wins; cynicism pays no dividends; first, principles; and, "questions are places
                    in the mind where answers fit". Clayton Christensen said that and I never forgot.
                </P>
            </Main>
            <Footer>
                <a href="https://github.com/thatalexpalmer" target="_blank">
                    GitHub
                </a>
                <a href="https://paragraph.xyz/@thatalexpalmer" target="_blank">
                    Paragraph
                </a>
                <a href="https://linkedin.com/in/thatalexpalmer" target="_blank">
                    LinkedIn
                </a>
            </Footer>
        </Container>
    );
}
