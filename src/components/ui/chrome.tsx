"use client";

import styled from "styled-components";
import { chromeLink } from "./styles";

export type StatusKind = "live" | "work" | "oss";

const StatusBadge = styled.span<{ $kind: StatusKind }>`
    align-self: center;
    width: max-content;
    padding: ${({ theme }) => theme.space(0.5)} ${({ theme }) => theme.space(2)};
    border: ${({ theme }) => theme.effects.hairline} solid ${({ theme, $kind }) => theme.colors.statusEdge[$kind]};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    line-height: 1.4;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme, $kind }) => theme.colors.status[$kind]};
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
