import LabeledSection from "@/components/LabeledSection";
import NestSourceInfo from "@/components/NestSourceInfo";
import PostRow from "@/components/PostRow";
import ProductRow from "@/components/ProductRow";
import SubscribeForm from "@/components/SubscribeForm";
import { Footer, H1, H2, Hero, Main, MoreLink, Nav, P, PostList, ProductList, Prose, RedBlock, Shell, Stat } from "@/components/ui";
import { jsonLdData, siteMetadata, socialLinks } from "@/config/seo";
import { buildProducts } from "@/data/products";
import { loadNestStats } from "@/lib/nest";
import { fetchRecentPosts, PARAGRAPH_PUBLICATION_URL } from "@/lib/paragraph";

export const revalidate = 3600;

export default async function Home() {
    const [nest, posts] = await Promise.all([loadNestStats(), fetchRecentPosts(5)]);
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

                <LabeledSection id="about" label="About">
                    <Prose>
                        <P>
                            Launched{" "}
                            <a href="https://nest.credit" target="_blank" rel="noopener noreferrer">
                                Nest
                            </a>
                            <NestSourceInfo fetchedAt={nest.fetchedAt} sourceUrl={nest.source} /> to let anyone with a wallet earn from RWAs — now{" "}
                            <Stat>{nest.totalHoldersLabel}</Stat> wallets and <Stat>{nest.totalTvlLabel}</Stat> TVL across Nest. That made Plume the{" "}
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
                </LabeledSection>

                <LabeledSection id="products" label="Products">
                    <ProductList>
                        {products.map((product) => (
                            <ProductRow key={product.name} product={product} />
                        ))}
                    </ProductList>
                </LabeledSection>

                <LabeledSection id="writing" label="Writing">
                    {posts.length > 0 && (
                        <PostList>
                            {posts.map((post) => (
                                <PostRow key={post.id} post={post} />
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
                </LabeledSection>

                <LabeledSection id="beliefs" label="Beliefs">
                    <P>
                        A few of my strong beliefs are: technology always wins; cynicism pays no dividends; first, principles; and, &ldquo;questions
                        are places in the mind where answers fit&rdquo;. Clayton Christensen said that and I never forgot.
                    </P>
                </LabeledSection>
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
