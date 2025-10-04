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
                    content="Head of Regulatory Strategy at Plume Network. Launched Nest to let anyone earn from real world assets. Building Transfer Agent Protocol to power Plume's transfer agent."
                />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Alex Palmer" />
                <meta property="og:url" content="https://palmer.earth" />
                <meta property="og:title" content="Alex Palmer" />
                <meta
                    property="og:description"
                    content="Head of Regulatory Strategy at Plume Network. Launched Nest to let anyone earn from real world assets. Building Transfer Agent Protocol to power Plume's transfer agent."
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

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Alex Palmer",
                            url: "https://palmer.earth",
                            image: "https://palmer.earth/og-avatar-v4.jpg",
                            jobTitle: "Head of Regulatory Strategy",
                            worksFor: {
                                "@type": "Organization",
                                name: "Plume Network",
                                url: "https://plume.org",
                            },
                            sameAs: [
                                "https://twitter.com/thatalexpalmer",
                                "https://github.com/thatalexpalmer",
                                "https://linkedin.com/in/thatalexpalmer",
                                "https://paragraph.xyz/@thatalexpalmer",
                                "https://farcaster.com/thatalexpalmer.eth",
                            ],
                            description:
                                "Head of Regulatory Strategy at Plume Network. Launched Nest to let anyone earn from real world assets. Building Transfer Agent Protocol to power Plume's transfer agent.",
                            knowsAbout: ["Blockchain", "Real World Assets", "Regulatory Strategy", "Product Development", "Web3"],
                        }),
                    }}
                />

                <noscript>
                    If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>.
                </noscript>
            </Head>
            <Main>
                <H1>Alex Palmer</H1>
                <Nav>
                    <span className="controls">
                        <a href="https://farcaster.com/thatalexpalmer.eth" target="_blank" rel="noopener noreferrer">
                            Farcaster
                        </a>
                        <a href="https://farcaster.com/thatalexpalmer.eth" target="_blank" rel="noopener noreferrer">
                            X
                        </a>
                    </span>
                </Nav>
                <RedBlock>
                    <H2>— Head of Regulatory Strategy at Plume, a public blockchain for scaling RWAs</H2>
                </RedBlock>
                <P>
                    Launched{" "}
                    <a href="https://nest.credit" target="_blank" rel="noopener noreferrer">
                        Nest
                    </a>{" "}
                    to let anyone with a wallet earn from real world assets. Building{" "}
                    <a href="https://transferagentprotocol.xyz" target="_blank" rel="noopener noreferrer">
                        Transfer Agent Protocol
                    </a>
                    , open source infrastructure for tokenized cap tables that will power Plume's transfer agent.
                </P>
                <P>2x founder before this. Ran payments infra, led products in pharma and AI.</P>
                <P>
                    A few of my strong beliefs are: technology always wins; cynicism pays no dividends; first, principles; and, "questions are places
                    in the mind where answers fit". Clayton Christensen said that and I never forgot.
                </P>
            </Main>
            <Footer>
                <a href="https://github.com/thatalexpalmer" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://paragraph.xyz/@thatalexpalmer" target="_blank" rel="noopener noreferrer">
                    Paragraph
                </a>
                <a href="https://linkedin.com/in/thatalexpalmer" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
            </Footer>
        </Container>
    );
}
