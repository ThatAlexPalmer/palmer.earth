import styled from "styled-components";

/**
 * Hero composition mirrors live palmer.earth:
 * centered name → space-between nav → monumental RedBlock with justified type
 * that intentionally overflows the red slab. Secondary sections sit below.
 */

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: ${({ theme }) => theme.layout.containerMaxWidth};
    min-height: 100%;
    margin: 0 auto;
    padding: 2rem 4%;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 1.5rem 3%;
    }
`;

const Main = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    align-self: center;
    justify-content: flex-start;
    flex: 1;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.mainMaxWidth};
    height: auto;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.smallLaptop}) {
        width: 100%;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 98%;
        margin: 0 auto;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: 96%;
    }
`;

const H1 = styled.h1`
    position: relative;
    display: inline-flex;
    line-height: 1.25;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: ${({ theme }) => theme.typography.fontSize.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    text-align: center;
    text-decoration: none;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.headlineWidth};

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin: 2rem auto;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }
`;

/** Live-site nav: full width under the name, GitHub left / X right */
const Nav = styled.nav`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-self: center;
    align-items: baseline;
    width: 100%;
    height: auto;

    .controls {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 0.5rem 0;
        font-size: ${({ theme }) => theme.typography.fontSize.uiCopy};

        @media only screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
            align-items: center;
            font-size: ${({ theme }) => theme.typography.fontSize.uiCopyMobile};
        }
    }

    a {
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline;
            text-decoration-thickness: 0.08rem;
            text-underline-offset: 0.2rem;
        }
        padding: 0 1rem 0 0;

        &:last-child {
            padding: 0;
        }
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: 98%;
    }
`;

/**
 * Signature red slab. ::before is 83% height so the last lines of the
 * justified H2 hang below the rectangle — that's the live-site look.
 */
const RedBlock = styled.span`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    width: 100%;
    height: auto;

    &::before {
        content: "";
        z-index: 1;
        display: block;
        position: absolute;
        width: 100%;
        height: 83%;
        background-color: ${({ theme }) => theme.colors.accent};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: 98%;
    }
`;

const H2 = styled.h2`
    z-index: 2;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: ${({ theme }) => theme.layout.headlineWidth};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: ${({ theme }) => theme.typography.fontSize.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-align: justify;
    /* Critical: live site uses ~200px top margin so the block sits mid-hero */
    margin: 12.5rem auto 0;
    text-transform: uppercase;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: ${({ theme }) => theme.layout.headlineWidthMobile};
        margin-top: 6rem;
    }
`;

const P = styled.p`
    max-width: ${({ theme }) => theme.layout.contentMaxWidth};
    text-align: left;
    margin: 1rem auto;
    line-height: 1.618;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    letter-spacing: 0.01618rem;

    &:first-of-type {
        margin-top: 2.5rem;
    }

    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        text-decoration: underline;
        text-underline-offset: 0.12rem;

        &:hover,
        &:focus-visible,
        &:active {
            text-decoration-thickness: 0.3rem;
        }
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        margin: 0.75rem auto;
        text-align: justify;
        line-height: 1.318;
    }
`;

/* —— Secondary sections (below the classic hero) —— */

const Below = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.contentMaxWidth};
    margin: ${({ theme }) => theme.space(14)} auto 0;
    gap: ${({ theme }) => theme.space(12)};
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(3)};
    width: 100%;
`;

const SectionLabel = styled.h3`
    margin: 0;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 1;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g40};

    .prefix {
        color: ${({ theme }) => theme.colors.accent};
        margin-right: ${({ theme }) => theme.space(1)};
    }
`;

const ProjectList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${({ theme }) => theme.colors.g08};
`;

const ProjectItem = styled.li`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(4)};
    align-items: baseline;
    padding: ${({ theme }) => theme.space(3)} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.g08};

    a {
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    .meta {
        font-family: ${({ theme }) => theme.typography.monoFont};
        font-size: ${({ theme }) => theme.typography.fontSize.xs};
        letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.g40};
        white-space: nowrap;
    }

    .blurb {
        grid-column: 1 / -1;
        margin: 0;
        font-size: ${({ theme }) => theme.typography.fontSize.md};
        color: ${({ theme }) => theme.colors.g60};
        line-height: 1.5;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.space(1)};
    }
`;

const PostList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${({ theme }) => theme.colors.g08};
`;

const PostItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(1)};
    padding: ${({ theme }) => theme.space(3)} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.g08};

    a {
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    .date {
        font-family: ${({ theme }) => theme.typography.monoFont};
        font-size: ${({ theme }) => theme.typography.fontSize.xs};
        letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.g40};
    }

    .subtitle {
        margin: 0;
        font-size: ${({ theme }) => theme.typography.fontSize.md};
        color: ${({ theme }) => theme.colors.g60};
        line-height: 1.5;
    }
`;

const MoreLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.space(1)};
    margin-top: ${({ theme }) => theme.space(1)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g60} !important;
    text-decoration: none !important;

    &:hover,
    &:focus-visible {
        color: ${({ theme }) => theme.colors.accent} !important;
    }
`;

const Footer = styled.footer`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    width: 100%;
    height: ${({ theme }) => theme.layout.footerHeight};
    margin: 0 auto;
    padding: 0;

    a {
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline;
            text-decoration-thickness: 0.1rem;
            text-underline-offset: 0.2rem;
        }
    }
`;

export { Container, Main, H1, Nav, H2, RedBlock, P, Below, Section, SectionLabel, ProjectList, ProjectItem, PostList, PostItem, MoreLink, Footer };
