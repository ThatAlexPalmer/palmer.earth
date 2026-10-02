"use client";

import styled from "styled-components";
import { chromeLink, headingFace } from "./styles";

const Shell = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.pageMaxWidth};
    min-height: 100vh;
    margin: 0 auto;
    padding: ${({ theme }) => theme.space(6)} ${({ theme }) => theme.space(5)};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(4)};
    }
`;

const NameRow = styled.nav`
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;

    a {
        ${chromeLink}
        ${headingFace}
        flex: 1 1 0;
        min-width: max-content;
        font-size: ${({ theme }) => theme.typography.fontSize.nameLink};
        line-height: 1.15;
        white-space: nowrap;
    }

    a:first-of-type {
        text-align: start;
    }

    a:last-of-type {
        text-align: end;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        a {
            font-size: ${({ theme }) => theme.typography.fontSize.nameLinkMobile};
        }
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width: 100%;
    gap: ${({ theme }) => theme.space(10)};
`;

const Hero = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.layout.heroGap};

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        margin-bottom: ${({ theme }) => theme.layout.heroGapMobile};
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

const Prose = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(4)};
`;

const Footer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space(3)};
    width: 100%;
    margin-top: ${({ theme }) => theme.space(16)};
    padding-bottom: ${({ theme }) => theme.space(4)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g68};

    a {
        ${chromeLink}
        display: inline-block;
        font-size: ${({ theme }) => theme.typography.fontSize.sm};
        font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: ${({ theme }) => theme.space(4)};
    }
`;

export { Shell, NameRow, Main, Hero, Section, Prose, Footer };
