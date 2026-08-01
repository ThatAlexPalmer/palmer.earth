"use client";

import { useState, FormEvent } from "react";
import styled from "styled-components";

/**
 * On-site subscribe form → POST /api/subscribe →
 * Paragraph official API: POST https://public.api.paragraph.com/api/v1/subscribers
 * with Authorization: Bearer $PARAGRAPH_API_KEY
 * @see https://paragraph.com/docs/api-reference/subscribers/add-a-new-subscriber
 */
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: ${({ theme }) => theme.space(2)};
    width: 100%;
    margin-top: ${({ theme }) => theme.space(3)};
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(1)};
    flex: 1 1 14rem;
    min-width: 0;
`;

const Label = styled.label`
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.g76};
`;

const Input = styled.input`
    width: 100%;
    min-height: 2.75rem;
    background: ${({ theme }) => theme.colors.form.surface};
    border: 1px solid ${({ theme }) => theme.colors.form.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.space(3)} ${({ theme }) => theme.space(3)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.g90};
    outline: none;
    transition: ${({ theme }) => theme.transitions.base};

    &::placeholder {
        color: ${({ theme }) => theme.colors.g60};
    }

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.form.borderHover};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    align-self: flex-end;
    min-height: 2.75rem;
    background: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.space(3)} ${({ theme }) => theme.space(5)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    /* Near-white on accent — readable cypherpunk CTA */
    color: ${({ theme }) => theme.colors.form.buttonText};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.base};
    white-space: nowrap;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
        background: ${({ theme }) => theme.colors.accentHover};
        border-color: ${({ theme }) => theme.colors.accentHover};
        color: ${({ theme }) => theme.colors.form.buttonText};
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

const Status = styled.p<{ $tone?: "ok" | "err" }>`
    margin: ${({ theme }) => theme.space(2)} 0 0;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme, $tone }) => ($tone === "ok" ? theme.colors.status.live : theme.colors.accent)};
`;

type StatusState = { tone: "ok" | "err"; text: string } | null;

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<StatusState>(null);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus(null);
        setLoading(true);
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            const data = (await res.json()) as { ok?: boolean; error?: string };
            if (res.ok && data.ok) {
                setStatus({ tone: "ok", text: "Subscribed. Check your inbox." });
                setEmail("");
            } else {
                setStatus({
                    tone: "err",
                    text: data.error || "Could not subscribe. Try again.",
                });
            }
        } catch {
            setStatus({ tone: "err", text: "Network error. Try again." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit} noValidate>
                <Field>
                    <Label htmlFor="subscribe-email">Email</Label>
                    <Input
                        id="subscribe-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                    />
                </Field>
                <Button type="submit" disabled={loading || !email.trim()}>
                    {loading ? "…" : "Subscribe"}
                </Button>
            </Form>
            {status && <Status $tone={status.tone}>{status.text}</Status>}
        </>
    );
}
