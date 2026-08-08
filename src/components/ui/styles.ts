"use client";

import { css } from "styled-components";

const bracketChrome = css`
    position: relative;
    --bracket-size: ${({ theme }) => theme.effects.bracketSize};
    --bracket-inset: ${({ theme }) => theme.effects.bracketInset};
    --bracket-offset: ${({ theme }) => theme.effects.bracketOffset};
    --bracket-color: ${({ theme }) => theme.colors.accentHover};

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: var(--bracket-size);
        height: var(--bracket-size);
        pointer-events: none;
        opacity: 0;
        transition: ${({ theme }) => theme.transitions.bracket};
    }

    &::before {
        top: var(--bracket-inset);
        left: var(--bracket-inset);
        border-top: ${({ theme }) => theme.effects.bracketThickness} solid var(--bracket-color);
        border-left: ${({ theme }) => theme.effects.bracketThickness} solid var(--bracket-color);
        transform: translate(calc(var(--bracket-offset) * -1), calc(var(--bracket-offset) * -1));
    }

    &::after {
        right: var(--bracket-inset);
        bottom: var(--bracket-inset);
        border-bottom: ${({ theme }) => theme.effects.bracketThickness} solid var(--bracket-color);
        border-right: ${({ theme }) => theme.effects.bracketThickness} solid var(--bracket-color);
        transform: translate(var(--bracket-offset), var(--bracket-offset));
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover::before,
        &:hover::after {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    &:focus-visible::before,
    &:focus-visible::after,
    &:focus-within::before,
    &:focus-within::after {
        opacity: 1;
        transform: translate(0, 0);
    }
`;

const linkHover = css`
    color: ${({ theme }) => theme.colors.accentHover};
    text-decoration: underline;
    text-decoration-thickness: 1px;
`;

const chromeLink = css`
    ${bracketChrome}
    --bracket-size: 6px;
    --bracket-inset: -5px;
    --bracket-offset: 3px;

    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.link};

    &:hover,
    &:focus-visible,
    &:active {
        ${linkHover}
    }
`;

const listReset = css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

export { bracketChrome, chromeLink, linkHover, listReset };
