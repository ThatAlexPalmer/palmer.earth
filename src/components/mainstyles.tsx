import styled from "styled-components";

const Shell = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.containerMaxWidth};
    min-height: 100%;
    margin: 0 auto;
    padding: ${({ theme }) => theme.space(6)} ${({ theme }) => theme.space(5)};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(4)};
    }
`;

const TopBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space(4)};
    width: 100%;
    padding-bottom: ${({ theme }) => theme.space(4)};
    margin-bottom: ${({ theme }) => theme.space(8)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.g12};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
`;

const Brand = styled.span`
    color: ${({ theme }) => theme.colors.g90};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    white-space: nowrap;

    .prompt {
        color: ${({ theme }) => theme.colors.g60};
        margin-right: ${({ theme }) => theme.space(1)};
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.space(4)};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};

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
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        gap: ${({ theme }) => theme.space(3)};
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.mainMaxWidth};
    gap: ${({ theme }) => theme.space(10)};
`;

const Hero = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const H1 = styled.h1`
    position: relative;
    display: block;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.headlineWidth};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: ${({ theme }) => theme.typography.fontSize.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.15;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.displayMobile};
    }
`;

/** Live-site RedBlock headline — do not change offset or width tokens */
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
    margin: 12.5rem auto 0;
    text-transform: uppercase;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: ${({ theme }) => theme.layout.headlineWidthMobile};
    }
`;

/** Live-site signature slab — 83% height so type hangs below the red */
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

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(4)};
    width: 100%;
    max-width: ${({ theme }) => theme.layout.contentMaxWidth};
    /* Center under RedBlock — matches live body column */
    align-self: center;
    margin: 0 auto;
`;

const SectionLabel = styled.h2`
    margin: 0;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 1;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g76};

    .prefix {
        color: ${({ theme }) => theme.colors.accent};
        margin-right: ${({ theme }) => theme.space(1)};
    }
`;

const P = styled.p`
    max-width: ${({ theme }) => theme.layout.contentMaxWidth};
    text-align: left;
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.paragraph};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.text};

    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        text-decoration: underline;
        text-underline-offset: 0.12rem;
        text-decoration-thickness: 0.08rem;

        &:hover,
        &:focus-visible,
        &:active {
            text-decoration-thickness: 0.16rem;
        }
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        line-height: 1.55;
    }
`;

const Prose = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(4)};
`;

const ProjectList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${({ theme }) => theme.colors.g12};
`;

const ProjectItem = styled.li`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(4)};
    align-items: baseline;
    padding: ${({ theme }) => theme.space(4)} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.g12};

    a {
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    .blurb {
        grid-column: 1 / -1;
        margin: 0;
        font-size: ${({ theme }) => theme.typography.fontSize.md};
        color: ${({ theme }) => theme.colors.g76};
        line-height: 1.55;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.space(1)};

        a {
            font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        }
    }
`;

type StatusKind = "live" | "work" | "oss";

const StatusBadge = styled.span<{ $kind: StatusKind }>`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme, $kind }) => theme.colors.status[$kind]};
    text-shadow:
        0 0 0.35rem ${({ theme, $kind }) => theme.colors.status[$kind]},
        0 0 0.85rem ${({ theme, $kind }) => theme.colors.status[$kind]};
`;

const Beliefs = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.space(3)};

    li {
        font-family: ${({ theme }) => theme.typography.monoFont};
        font-size: ${({ theme }) => theme.typography.fontSize.md};
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.g90};
        padding: ${({ theme }) => theme.space(3)};
        border: 1px solid ${({ theme }) => theme.colors.g12};
        background: ${({ theme }) => theme.colors.g04};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        grid-template-columns: 1fr;
    }
`;

const Footer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space(3)};
    width: 100%;
    margin-top: ${({ theme }) => theme.space(12)};
    padding-top: ${({ theme }) => theme.space(4)};
    border-top: 1px solid ${({ theme }) => theme.colors.g12};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g68};

    a {
        color: ${({ theme }) => theme.colors.text};
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
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: ${({ theme }) => theme.space(4)};
    }
`;

const MoreLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.space(1)};
    width: fit-content;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text} !important;
    text-decoration: none !important;
    padding-bottom: ${({ theme }) => theme.space(1)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.g20};
    transition: ${({ theme }) => theme.transitions.base};

    &:hover,
    &:focus-visible {
        color: ${({ theme }) => theme.colors.accent} !important;
        border-bottom-color: ${({ theme }) => theme.colors.accent};
    }
`;

export {
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
    StatusBadge,
    Beliefs,
    Footer,
    MoreLink,
};
