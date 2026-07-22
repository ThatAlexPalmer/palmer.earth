import styled, { css, keyframes } from "styled-components";

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

const Nav = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: ${({ theme }) => theme.space(4)};
    margin-bottom: ${({ theme }) => theme.space(8)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;

    a {
        color: ${({ theme }) => theme.colors.g76};
        font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.text};
        }
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

/** Live-site RedBlock headline — keep offset; width/size from theme for title fit */
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

    /* Inline links: sharp accent snap — no muddy highlight pad */
    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        text-decoration: none;
        text-underline-offset: 0.18em;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible {
            color: ${({ theme }) => theme.colors.accentHover};
            text-decoration: underline;
            text-decoration-thickness: 1px;
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

const Stat = styled.span`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    color: ${({ theme }) => theme.colors.g90};
    white-space: nowrap;
`;

/** Shared list shell */
const listReset = css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const ProductList = styled.ul`
    ${listReset}
`;

const PostList = styled.ul`
    ${listReset}
`;

/**
 * Cyberpunk corner brackets at bottom-right.
 * Horizontal tick (::before) + vertical tick (::after).
 * Desktop hover/focus-within only — no sticky mobile hover fill.
 */
const listRowChrome = css`
    position: relative;
    padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(3)};
    margin: 0 -${({ theme }) => theme.space(3)};
    border-radius: 0;
    transition: ${({ theme }) => theme.transitions.base};

    &::before,
    &::after {
        content: "";
        position: absolute;
        pointer-events: none;
        opacity: 0;
        background: ${({ theme }) => theme.colors.accent};
        transition: ${({ theme }) => theme.transitions.bracket};
        z-index: 1;
    }

    /* horizontal tick */
    &::before {
        right: ${({ theme }) => theme.effects.bracketInset};
        bottom: ${({ theme }) => theme.effects.bracketInset};
        width: ${({ theme }) => theme.effects.bracketSize};
        height: ${({ theme }) => theme.effects.bracketThickness};
        transform: translateX(4px);
    }

    /* vertical tick */
    &::after {
        right: ${({ theme }) => theme.effects.bracketInset};
        bottom: ${({ theme }) => theme.effects.bracketInset};
        width: ${({ theme }) => theme.effects.bracketThickness};
        height: ${({ theme }) => theme.effects.bracketSize};
        transform: translateY(4px);
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:focus-within {
            &::before,
            &::after {
                opacity: 1;
                transform: translate(0, 0);
            }
        }
    }

    &:focus-within {
        &::before,
        &::after {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    a.title {
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
        text-decoration: none;
        text-underline-offset: 0.18em;
        transition: ${({ theme }) => theme.transitions.link};
        width: fit-content;
        max-width: 100%;

        /* Match body link hover: accentHover + hard underline */
        &:hover,
        &:focus-visible {
            color: ${({ theme }) => theme.colors.accentHover};
            text-decoration: underline;
            text-decoration-thickness: 1px;
        }
    }

    .blurb,
    .subtitle {
        margin: 0;
        font-size: ${({ theme }) => theme.typography.fontSize.md};
        color: ${({ theme }) => theme.colors.g76};
        line-height: 1.55;
    }

    .meta {
        font-family: ${({ theme }) => theme.typography.monoFont};
        font-size: ${({ theme }) => theme.typography.fontSize.sm};
        letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.g68};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        a.title {
            font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        }

        /* keep brackets off sticky-touch chrome */
        @media (hover: none) {
            &::before,
            &::after {
                display: none;
            }
        }
    }
`;

const ProductItem = styled.li`
    ${listRowChrome}
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(4)};
    align-items: baseline;

    .blurb {
        grid-column: 1 / -1;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.space(1)};
    }
`;

const PostItem = styled.li`
    ${listRowChrome}
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(1)};

    .row-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
    }
`;

const neonFlicker = keyframes`
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        opacity: 1;
        filter: brightness(1);
    }
    20%, 24%, 55% {
        opacity: 0.72;
        filter: brightness(1.35);
    }
    40% {
        opacity: 0.9;
        filter: brightness(1.1);
    }
    70% {
        opacity: 0.85;
        filter: brightness(1.2);
    }
`;

type StatusKind = "live" | "work" | "oss";

const StatusBadge = styled.span<{ $kind: StatusKind }>`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme, $kind }) => theme.colors.status[$kind]};
    text-shadow:
        0 0 1px ${({ theme, $kind }) => theme.colors.status[$kind]},
        0 0 6px ${({ theme, $kind }) => theme.colors.status[$kind]},
        0 0 14px ${({ theme, $kind }) => theme.colors.status[$kind]};
    animation: ${neonFlicker} ${({ theme }) => theme.effects.badgeFlickerDuration} step-end infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
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
        color: ${({ theme }) => theme.colors.g76};
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.text};
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
    gap: ${({ theme }) => theme.space(2)};
    width: fit-content;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g76} !important;
    text-decoration: none !important;
    transition: ${({ theme }) => theme.transitions.link};

    .arrow {
        display: inline-block;
        transition: ${({ theme }) => theme.transitions.link};
    }

    &:hover,
    &:focus-visible {
        color: ${({ theme }) => theme.colors.accent} !important;

        .arrow {
            transform: translateX(0.25rem);
        }
    }
`;

export {
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
};
