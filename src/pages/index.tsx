import Head from "next/head";
import dynamic from "next/dynamic";
import {
    Shell,
    Nav,
    Main,
    Hero,
    H1,
    H2,
    RedBlock,
    Section,
    SectionLabel,
    P,
    Prose,
    Stat,
    ProductList,
    ProductItem,
    StatusBadge,
    PostList,
    PostItem,
    Footer,
    MoreLink,
} from "@/components/mainstyles";
import { siteMetadata, socialLinks, jsonLdData } from "@/config/seo";
import { fetchRecentPosts, PARAGRAPH_PUBLICATION_URL, type ParagraphPost } from "@/lib/paragraph";
import { fetchNestStats, type NestStats } from "@/lib/nest";

const SubscribeForm = dynamic(() => import("@/components/SubscribeForm"), { ssr: false });

type Product = {
    name: string;
    href: string;
    meta: "work" | "live" | "oss";
    blurb: string;
};

function buildProducts(nest: NestStats): Product[] {
    const nestHolders = nest.maxVaultHoldersLabel ?? "60k+";
    const nestTvl = nest.totalTvlLabel;

    const nestBlurb = nestTvl
        ? `Anyone with a wallet can earn from RWAs — ${nestHolders} holders on the largest vault, ${nestTvl} TVL across Nest. Helped make Plume top chain by RWA holders.`
        : `Anyone with a wallet can earn from RWAs — ${nestHolders} holders on the largest vault. Helped make Plume top chain by RWA holders.`;

    return [
        {
            name: "Plume",
            href: "https://plume.org",
            meta: "work",
            blurb: "Public blockchain for scaling real-world assets. Head of Regulatory Product Strategy.",
        },
        {
            name: "Nest",
            href: "https://nest.credit",
            meta: "live",
            blurb: nestBlurb,
        },
        {
            name: "Visualize Laws",
            href: "https://visualizelaws.com",
            meta: "live",
            blurb: "Explore ~2.2M U.S. local laws — search, filter, map. Financial / state / federal next.",
        },
        {
            name: "Transfer Agent Protocol",
            href: "https://transferagentprotocol.xyz",
            meta: "oss",
            blurb: "Open-source infrastructure for tokenized cap tables powering Plume's transfer agent.",
        },
    ];
}

type HomeProps = {
    posts: ParagraphPost[];
    nest: NestStats;
};

export default function Home({ posts, nest }: HomeProps) {
    const products = buildProducts(nest);
    const holdersLabel = nest.maxVaultHoldersLabel ?? "60k+";
    const tvlLabel = nest.totalTvlLabel;

    return (
        <Shell>
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

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

                <noscript>
                    If you&apos;re seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>.
                </noscript>
            </Head>

            <Nav>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    X
                </a>
            </Nav>

            <Main>
                <Hero>
                    <H1>{siteMetadata.title}</H1>
                    <RedBlock>
                        <H2>— Head of Regulatory Product Strategy at Plume, a public blockchain for scaling RWAs</H2>
                    </RedBlock>
                </Hero>

                <Section aria-labelledby="about-label">
                    <SectionLabel id="about-label">
                        <span className="prefix">{"//"}</span>
                        About
                    </SectionLabel>
                    <Prose>
                        <P>
                            Launched{" "}
                            <a href="https://nest.credit" target="_blank" rel="noopener noreferrer">
                                Nest
                            </a>{" "}
                            to let anyone with a wallet earn from RWAs
                            {tvlLabel ? (
                                <>
                                    {" "}
                                    — now <Stat>{holdersLabel}</Stat> holders on the largest vault and <Stat>{tvlLabel}</Stat> TVL across the protocol
                                </>
                            ) : (
                                <>
                                    {" "}
                                    — <Stat>{holdersLabel}</Stat> holders on the largest vault
                                </>
                            )}
                            . That made Plume the{" "}
                            <a href="https://app.rwa.xyz/networks/plume" target="_blank" rel="noopener noreferrer">
                                top chain by RWA holders
                            </a>{" "}
                            (60k before we launched, 200k+ as of now). Building{" "}
                            <a href="https://transferagentprotocol.xyz" target="_blank" rel="noopener noreferrer">
                                Transfer Agent Protocol
                            </a>
                            , open source infrastructure for tokenized cap tables that will power Plume&apos;s transfer agent.
                        </P>
                        <P>
                            2x founder before this. Ran payments infra, led products in pharma and AI. Built{" "}
                            <a href="https://visualizelaws.com" target="_blank" rel="noopener noreferrer">
                                Visualize Laws
                            </a>{" "}
                            to explore 2.2M U.S. local laws, with financial, state, and federal law to come. I build things and write about them on{" "}
                            <a href={socialLinks.paragraph} target="_blank" rel="noopener noreferrer">
                                Paragraph
                            </a>
                            .
                        </P>
                    </Prose>
                </Section>

                <Section aria-labelledby="products-label">
                    <SectionLabel id="products-label">
                        <span className="prefix">{"//"}</span>
                        Products
                    </SectionLabel>
                    <ProductList>
                        {products.map((p) => (
                            <ProductItem key={p.name}>
                                <a className="title" href={p.href} target="_blank" rel="noopener noreferrer">
                                    {p.name}
                                </a>
                                <StatusBadge $kind={p.meta}>{p.meta}</StatusBadge>
                                <p className="blurb">{p.blurb}</p>
                            </ProductItem>
                        ))}
                    </ProductList>
                </Section>

                <Section aria-labelledby="writing-label">
                    <SectionLabel id="writing-label">
                        <span className="prefix">{"//"}</span>
                        Writing
                    </SectionLabel>
                    {posts.length > 0 && (
                        <PostList>
                            {posts.map((post) => (
                                <PostItem key={post.id}>
                                    <div className="row-meta">
                                        {post.publishedAtLabel && (
                                            <time className="meta" dateTime={post.publishedAt || undefined}>
                                                {post.publishedAtLabel}
                                            </time>
                                        )}
                                        {post.viewsLabel && <span className="meta">{post.viewsLabel} views</span>}
                                    </div>
                                    <a className="title" href={post.url} target="_blank" rel="noopener noreferrer">
                                        {post.title}
                                    </a>
                                    {post.subtitle && <p className="subtitle">{post.subtitle}</p>}
                                </PostItem>
                            ))}
                        </PostList>
                    )}
                    <MoreLink href={PARAGRAPH_PUBLICATION_URL} target="_blank" rel="noopener noreferrer">
                        Read all on Paragraph
                        <span className="arrow" aria-hidden="true">
                            →
                        </span>
                    </MoreLink>
                    <SubscribeForm />
                </Section>

                <Section aria-labelledby="beliefs-label">
                    <SectionLabel id="beliefs-label">
                        <span className="prefix">{"//"}</span>
                        Beliefs
                    </SectionLabel>
                    <P>
                        A few of my strong beliefs are: technology always wins; cynicism pays no dividends; first, principles; and, &ldquo;questions
                        are places in the mind where answers fit&rdquo;. Clayton Christensen said that and I never forgot.
                    </P>
                </Section>
            </Main>

            <Footer>
                <span>© {new Date().getFullYear()}</span>
                <div className="links">
                    <a href={socialLinks.farcaster} target="_blank" rel="noopener noreferrer">
                        Farcaster
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </Footer>
        </Shell>
    );
}

export async function getStaticProps() {
    const [posts, nest] = await Promise.all([fetchRecentPosts(5), fetchNestStats()]);
    return {
        props: { posts, nest },
        revalidate: 3600,
    };
}
