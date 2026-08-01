import {
    Footer,
    H1,
    H2,
    Hero,
    Main,
    MoreLink,
    Nav,
    P,
    PostItem,
    PostList,
    ProductItem,
    ProductList,
    Prose,
    RedBlock,
    Section,
    SectionLabel,
    Shell,
    Stat,
    StatusBadge,
} from "@/components/mainstyles";
import NestSourceInfo from "@/components/NestSourceInfo";
import SubscribeForm from "@/components/SubscribeForm";
import { jsonLdData, siteMetadata, socialLinks } from "@/config/seo";
import { loadNestStatsForPage, type NestStats } from "@/lib/nest";
import { fetchRecentPosts, PARAGRAPH_PUBLICATION_URL } from "@/lib/paragraph";

export const dynamic = "force-static";
// Paragraph ISR only — Nest numbers always come from committed nest-stats.json, not this revalidate.
export const revalidate = 86400;

type Product = {
    name: string;
    href: string;
    meta: "work" | "live" | "oss";
    blurb: string;
};

function buildProducts(nest: NestStats): Product[] {
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
            blurb: `Anyone with a wallet can earn from RWAs — now ${nest.totalHoldersLabel} vault positions and ${nest.totalTvlLabel} TVL across Nest. Helped make Plume top chain by RWA holders.`,
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

export default async function Home() {
    // Nest: committed snapshot only (no live fetch on page load).
    const nest = loadNestStatsForPage();
    const posts = await fetchRecentPosts(5);
    const products = buildProducts(nest);

    return (
        <Shell>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c") }} />
            <noscript>
                If you&apos;re seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>.
            </noscript>

            <Nav aria-label="Social">
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
                            </a>
                            to let anyone with a wallet earn from RWAs — now <Stat>{nest.totalHoldersLabel}</Stat> holders across Nest vaults and{" "}
                            <Stat>{nest.totalTvlLabel}</Stat> TVL <NestSourceInfo fetchedAt={nest.fetchedAt} sourceUrl={nest.source} />. That made
                            Plume the{" "}
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
                        {products.map((product) => (
                            <ProductItem key={product.name}>
                                <a className="title" href={product.href} target="_blank" rel="noopener noreferrer">
                                    {product.name}
                                </a>
                                <StatusBadge $kind={product.meta}>{product.meta}</StatusBadge>
                                <p className="blurb">{product.blurb}</p>
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
