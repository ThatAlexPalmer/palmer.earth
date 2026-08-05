"use client";

import styled, { keyframes } from "styled-components";
import { chromeLink } from "./styles";

export type StatusKind = "live" | "work" | "oss";

/**
 * Shallow, irregular flicker — a failing HUD element, not a nightclub sign.
 * Fully disabled under prefers-reduced-motion.
 */
const hudFlicker = keyframes`
    0%, 41%, 43%, 62%, 64%, 100% {
        opacity: 1;
    }
    42%, 63% {
        opacity: 0.82;
    }
    82% {
        opacity: 0.92;
    }
`;

/** Hairline HUD chip: hard corners, tight glow, no bloom. */
const StatusBadge = styled.span<{ $kind: StatusKind }>`
    align-self: center;
    padding: 2px ${({ theme }) => theme.space(2)};
    border: 1px solid ${({ theme, $kind }) => theme.colors.statusEdge[$kind]};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    line-height: 1.4;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme, $kind }) => theme.colors.status[$kind]};
    text-shadow:
        0 0 ${({ theme }) => theme.effects.glowCore} ${({ theme, $kind }) => theme.colors.status[$kind]},
        0 0 ${({ theme }) => theme.effects.glowHalo} ${({ theme, $kind }) => theme.colors.statusEdge[$kind]};
    animation: ${hudFlicker} ${({ theme }) => theme.effects.badgeFlickerDuration} step-end infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const MoreLink = styled.a`
    ${chromeLink}
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.space(2)};
    width: fit-content;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;

    .arrow {
        display: inline-block;
        transition: ${({ theme }) => theme.transitions.link};
    }

    &:hover .arrow,
    &:focus-visible .arrow {
        transform: translateX(0.25rem);
    }
`;

export { StatusBadge, MoreLink };
