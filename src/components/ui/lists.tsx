"use client";

import styled, { css } from "styled-components";
import { bracketChrome, linkHover, listReset } from "./styles";

const ProductList = styled.ul`
    ${listReset}
`;

const PostList = styled.ul`
    ${listReset}
`;

/** Shared row shell: no fill, no divider — brackets carry the affordance. */
const rowChrome = css`
    ${bracketChrome}
    padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(3)};
    margin: 0 -${({ theme }) => theme.space(3)};
    transition: ${({ theme }) => theme.transitions.base};
`;

const ProductItem = styled.li`
    ${rowChrome}
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(4)};
    align-items: baseline;

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.space(1)};
    }
`;

const PostItem = styled.li`
    ${rowChrome}
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(1)};
`;

/**
 * Row heading link. The transparent ::before overlay makes the whole row
 * clickable while the anchor stays the single semantic link.
 */
const RowTitle = styled.a`
    position: static;
    width: fit-content;
    max-width: 100%;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-decoration: none;
    text-underline-offset: 0.18em;
    transition: ${({ theme }) => theme.transitions.link};

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 2;
    }

    &:hover,
    &:focus-visible {
        ${linkHover}
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
    }
`;

/** Supporting copy under a row title (product blurb / post subtitle). */
const RowText = styled.p`
    grid-column: 1 / -1;
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.g76};
    line-height: 1.55;
`;

const RowMetaBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
`;

const RowMeta = styled.span`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g68};
`;

export { ProductList, PostList, ProductItem, PostItem, RowTitle, RowText, RowMetaBar, RowMeta };
