import Head from "next/head";
import dynamic from "next/dynamic";
import {
    Shell,
    TopBar,
    Brand,
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
    ProjectList,
    ProjectItem,
    PostList,
    PostItem,
    Beliefs,
    Footer,
    MoreLink,
    MutedNote,
} from "@/components/mainstyles";
import { siteMetadata, socialLinks, jsonLdData } from "@/config/seo";
import { fetchRecentPosts, PARAGRAPH_PUBLICATION_URL, type ParagraphPost } from "@/lib/paragraph";

const SubscribeForm = dynamic(() => import("@/components/SubscribeForm"), { ssr: false });

const projects = [
    {
        name: "Nest",
        href: "https://nest.credit",
        meta: "live",
        blurb: "Anyone with a wallet can earn from RWAs — helped make Plume top chain by RWA holders.",
    },
    {
        name: "Transfer Agent Protocol",
        href: "https://transferagentprotocol.xyz",
        meta: "oss",
        blurb: "Open-source infrastructure for tokenized cap tables powering Plume's transfer agent.",
    },
    {
        name: "Visualize Laws",
        href: "https://visualizelaws.com",
        meta: "live",
        blurb: "Explore ~2.2M U.S. local laws — search, filter, map. Financial / state / federal next.",
    },
    {
        name: "Plume",
        href: "https://plume.org",
        meta: "work",
        blurb: "Public blockchain for scaling real-world assets. Head of Regulatory Strategy.",
    },
] as const;

const beliefs = [
    "Technology always wins",
    "Cynicism pays no dividends",
    "First, principles",
    "Questions are places in the mind where answers fit",
] as const;

type HomeProps = {
    posts: ParagraphPost[];
};

export default function Home({ posts }: HomeProps) {
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

            <TopBar>
                <Brand>
                    <span className="prompt">~$</span>
                    palmer.earth
                </Brand>
                <Nav>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        X
                    </a>
                    <a href={socialLinks.paragraph} target="_blank" rel="noopener noreferrer">
                        Paragraph
                    </a>
                </Nav>
            </TopBar>

            <Main>
                <Hero>
                    <H1>
                        {siteMetadata.title}
                        <span className="caret" aria-hidden="true" />
                    </H1>
                    <RedBlock>
                        <H2>— Head of Regulatory Strategy at Plume, a public blockchain for scaling RWAs</H2>
                    </RedBlock>
                </Hero>

                <Section aria-labelledby="about-label">
                    <SectionLabel id="about-label">
                        <span className="prefix">{"//"}</span>
                        About
                    </SectionLabel>
                    <Prose>
                        <P>
                            2x founder. Ran payments infra, led products in pharma and AI. Now building the stack for tokenized real-world assets —
                            and writing about product strategy for globally compliant infra.
                        </P>
                    </Prose>
                </Section>

                <Section aria-labelledby="work-label">
                    <SectionLabel id="work-label">
                        <span className="prefix">{"//"}</span>
                        Work
                    </SectionLabel>
                    <ProjectList>
                        {projects.map((p) => (
                            <ProjectItem key={p.name}>
                                <a href={p.href} target="_blank" rel="noopener noreferrer">
                                    {p.name}
                                </a>
                                <span className="meta">{p.meta}</span>
                                <p className="blurb">{p.blurb}</p>
                            </ProjectItem>
                        ))}
                    </ProjectList>
                </Section>

                <Section aria-labelledby="writing-label">
                    <SectionLabel id="writing-label">
                        <span className="prefix">{"//"}</span>
                        Writing
                    </SectionLabel>
                    {posts.length > 0 ? (
                        <PostList>
                            {posts.map((post) => (
                                <PostItem key={post.id}>
                                    {post.publishedAtLabel && (
                                        <time className="date" dateTime={post.publishedAt || undefined}>
                                            {post.publishedAtLabel}
                                        </time>
                                    )}
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                                        {post.title}
                                    </a>
                                    {post.subtitle && <p className="subtitle">{post.subtitle}</p>}
                                </PostItem>
                            ))}
                        </PostList>
                    ) : (
                        <P>
                            Essays on product strategy for tokenized RWAs live on{" "}
                            <a href={PARAGRAPH_PUBLICATION_URL} target="_blank" rel="noopener noreferrer">
                                Paragraph
                            </a>
                            .
                        </P>
                    )}
                    <MoreLink href={PARAGRAPH_PUBLICATION_URL} target="_blank" rel="noopener noreferrer">
                        All posts on Paragraph ↗
                    </MoreLink>
                    <SubscribeForm />
                </Section>

                <Section aria-labelledby="beliefs-label">
                    <SectionLabel id="beliefs-label">
                        <span className="prefix">{"//"}</span>
                        Beliefs
                    </SectionLabel>
                    <Beliefs>
                        {beliefs.map((b) => (
                            <li key={b}>{b}</li>
                        ))}
                    </Beliefs>
                    <MutedNote>Clayton Christensen: &ldquo;questions are places in the mind where answers fit.&rdquo;</MutedNote>
                </Section>
            </Main>

            <Footer>
                <span>© {new Date().getFullYear()} Alex Palmer</span>
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
    const posts = await fetchRecentPosts(5);
    return {
        props: { posts },
        revalidate: 3600,
    };
}
