"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import styled from "styled-components";

const Wrapper = styled.span`
    position: relative;
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    margin-left: 2px;
    vertical-align: super;
    transform: translateY(-0.1em);
`;

const Trigger = styled.button`
    display: inline-grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: ${({ theme }) => theme.colors.g68};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    line-height: 1;
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
    right: 0;
    bottom: calc(100% + ${({ theme }) => theme.space(2)});
    z-index: 10;
    width: max-content;
    max-width: min(18rem, calc(100vw - 2rem));
    padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
    border: 1px solid ${({ theme }) => theme.colors.g12};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.g76};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: 1.5;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: translateY(${({ $open }) => ($open ? "0" : "4px")});
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: ${({ theme }) => theme.transitions.base};
    overflow-wrap: anywhere;

    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        width: 9rem;
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
                aria-label="Nest stats data source"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={popoverId}
                onClick={() => setOpen((current) => !current)}
            >
                ⓘ
            </Trigger>
            <Popover id={popoverId} role="dialog" aria-label="Nest stats data source" aria-hidden={!open} $open={open}>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    Nest API
                </a>{" "}
                · as of {formatUtcDateTime(fetchedAt)}
            </Popover>
        </Wrapper>
    );
}
