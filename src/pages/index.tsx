import Head from "next/head";
import { Container, Main, H1, Nav, H2, RedBlock, P, Footer } from "@/components/mainstyles";
import { siteMetadata, socialLinks, jsonLdData } from "@/config/seo";

export default function Home() {
    return (
        <Container>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
                <title>{siteMetadata.title}</title>
                <meta name="author" content={siteMetadata.title} />
                <meta name="description" content={siteMetadata.description} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:url" content={siteMetadata.url} />
                <meta property="og:title" content={siteMetadata.title} />
                <meta property="og:description" content={siteMetadata.description} />
                <meta property="og:image" content={siteMetadata.image} />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="og:image:width" content="279" />
                <meta property="og:image:height" content="279" />

                <meta name="theme-color" content={siteMetadata.themeColor} />
                <link rel="canonical" href={siteMetadata.url} />
                <link rel="manifest" href="/site.webmanifest" />

                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="palmer.earth" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

                <noscript>
                    If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>.
                </noscript>
            </Head>
            <Main>
                <H1>{siteMetadata.title}</H1>
                <Nav>
                    <span className="controls">
                        <a href={socialLinks.farcaster} target="_blank" rel="noopener noreferrer">
                            Farcaster
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
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
                    to let anyone with a wallet earn from RWAs. This made Plume the{" "}
                    <a href="https://app.rwa.xyz/platforms/nest" target="_blank" rel="noopener noreferrer">
                        top chain by RWA holders
                    </a>{" "}
                    (60k before we launched, 200k+ as of now). Building{" "}
                    <a href="https://transferagentprotocol.xyz" target="_blank" rel="noopener noreferrer">
                        Transfer Agent Protocol
                    </a>
                    , open source infrastructure for tokenized cap tables that will power Plume's transfer agent.
                </P>
                <P>2x founder before this. Ran payments infra, led products in pharma and AI. I build things and write about them.</P>
                <P>
                    A few of my strong beliefs are: technology always wins; cynicism pays no dividends; first, principles; and, "questions are places
                    in the mind where answers fit". Clayton Christensen said that and I never forgot.
                </P>
            </Main>
            <Footer>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href={socialLinks.paragraph} target="_blank" rel="noopener noreferrer">
                    Paragraph
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
            </Footer>
        </Container>
    );
}
