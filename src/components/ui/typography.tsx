"use client";

import styled from "styled-components";
import { headingFace, linkHover } from "./styles";

const H1 = styled.h1`
    ${headingFace}
    position: relative;
    display: block;
    flex: 0 0 auto;
    margin: 0;
    max-width: ${({ theme }) => theme.layout.headlineWidth};
    font-size: ${({ theme }) => theme.typography.fontSize.display};
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.displayMobile};
    }
`;

const H2 = styled.h2`
    z-index: ${({ theme }) => theme.layers.slab};
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

const RedBlock = styled.span`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    width: 100%;
    height: auto;
    padding-bottom: ${({ theme }) => theme.space(4)};

    &::before {
        content: "";
        z-index: 1;
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: ${({ theme }) => theme.layout.heroSlab};
        background-color: ${({ theme }) => theme.colors.accent};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: 98%;
    }
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
        text-decoration: none;
        text-underline-offset: 0.18em;
        transition: ${({ theme }) => theme.transitions.link};

        &:hover,
        &:focus-visible {
            ${linkHover}
        }
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        line-height: 1.55;
    }
`;

const Stat = styled.span`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    color: ${({ theme }) => theme.colors.g90};
    white-space: nowrap;
`;

export { H1, H2, RedBlock, SectionLabel, P, Stat };
