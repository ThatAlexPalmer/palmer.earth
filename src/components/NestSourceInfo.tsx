"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import styled from "styled-components";

/**
 * Footnote marker for the Nest figures: a superscript ⓘ
 */
const Wrapper = styled.span`
    position: relative;
    display: inline;
    white-space: nowrap;
`;

const Trigger = styled.button`
    display: inline;
    margin: 0 0 0 1px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.g60};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    line-height: 1;
    vertical-align: super;
    cursor: help;
    transition: ${({ theme }) => theme.transitions.link};

    &:hover,
    &:focus-visible,
    &[aria-expanded="true"] {
        color: ${({ theme }) => theme.colors.accentHover};
    }
`;

const Popover = styled.span<{ $open: boolean }>`
    position: absolute;
    top: calc(100% + ${({ theme }) => theme.space(2)});
    left: 0;
    z-index: ${({ theme }) => theme.layers.popover};
    display: block;
    width: max-content;
    max-width: min(20rem, calc(100vw - 2rem));
    padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
    border: 1px solid ${({ theme }) => theme.colors.overlay.border};
    background: ${({ theme }) => theme.colors.overlay.surface};
    color: ${({ theme }) => theme.colors.g76};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: 1.5;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    text-transform: none;
    white-space: normal;
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: translateY(${({ $open }) => ($open ? "0" : "-4px")});
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: ${({ theme }) => theme.transitions.base};

    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    }

    .caption {
        display: block;
        margin-top: ${({ theme }) => theme.space(1)};
        color: ${({ theme }) => theme.colors.g68};
    }
`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatUtcDateTime(value: string): string {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return "unknown time";

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = MONTHS[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes} UTC`;
}

export default function NestSourceInfo({ fetchedAt, sourceUrl }: { fetchedAt: string; sourceUrl: string }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const popoverId = "nest-stats-source";

    useEffect(() => {
        if (!open) return;

        function closeOnOutsidePointer(event: PointerEvent) {
            if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
        }

        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("pointerdown", closeOnOutsidePointer);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePointer);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    function handleBlur(event: FocusEvent<HTMLSpanElement>) {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }

    return (
        <Wrapper
            ref={wrapperRef}
            onBlur={handleBlur}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
                if (!wrapperRef.current?.contains(document.activeElement)) setOpen(false);
            }}
        >
            <Trigger
                type="button"
                aria-label="Nest data source"
                aria-expanded={open}
                aria-controls={popoverId}
                onClick={() => setOpen((current) => !current)}
            >
                ⓘ
            </Trigger>
            {/* Disclosure, not a dialog: hover/click card with one link — no focus trap */}
            <Popover id={popoverId} role="region" aria-label="Nest data source" aria-hidden={!open} $open={open}>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    Nest API
                </a>{" "}
                · as of {formatUtcDateTime(fetchedAt)}
                <span className="caption">Unique wallets that have balances across our vaults.</span>
            </Popover>
        </Wrapper>
    );
}
