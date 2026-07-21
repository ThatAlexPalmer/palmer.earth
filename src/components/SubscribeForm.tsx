import { useEffect, useState, FormEvent } from "react";
import styled from "styled-components";
import { PARAGRAPH_PUBLICATION_URL } from "@/lib/paragraph";

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space(2)};
    width: 100%;
    margin-top: ${({ theme }) => theme.space(2)};
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space(1)};
    flex: 1 1 12rem;
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
    background: ${({ theme }) => theme.colors.g04};
    border: 1px solid ${({ theme }) => theme.colors.g20};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.space(2.5)} ${({ theme }) => theme.space(3)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: ${({ theme }) => theme.transitions.base};

    &::placeholder {
        color: ${({ theme }) => theme.colors.g60};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.g76};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    align-self: flex-end;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.g40};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.space(2.5)} ${({ theme }) => theme.space(4)};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.base};
    white-space: nowrap;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`;

const Status = styled.p<{ $tone?: "ok" | "err" | "muted" }>`
    margin: ${({ theme }) => theme.space(2)} 0 0;
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme, $tone }) => ($tone === "ok" ? theme.colors.g90 : $tone === "err" ? theme.colors.accent : theme.colors.g68)};
`;

const Cta = styled.a`
    display: inline-flex;
    align-items: center;
    margin-top: ${({ theme }) => theme.space(2)};
    padding: ${({ theme }) => theme.space(2.5)} ${({ theme }) => theme.space(4)};
    border: 1px solid ${({ theme }) => theme.colors.g40};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-family: ${({ theme }) => theme.typography.monoFont};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.mono};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text} !important;
    text-decoration: none !important;
    transition: ${({ theme }) => theme.transitions.base};
    width: fit-content;

    &:hover,
    &:focus-visible {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent} !important;
    }
`;

type StatusState = { tone: "ok" | "err" | "muted"; text: string } | null;

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [configured, setConfigured] = useState<boolean | null>(null);
    const [status, setStatus] = useState<StatusState>(null);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/subscribe-status")
            .then((r) => r.json())
            .then((data: { configured?: boolean }) => {
                if (!cancelled) setConfigured(Boolean(data.configured));
            })
            .catch(() => {
                if (!cancelled) setConfigured(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus(null);
        setLoading(true);
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = (await res.json()) as { ok?: boolean; error?: string };
            if (res.ok && data.ok) {
                setStatus({ tone: "ok", text: "Subscribed. Check your inbox." });
                setEmail("");
            } else {
                setStatus({ tone: "err", text: data.error || "Something went wrong." });
            }
        } catch {
            setStatus({ tone: "err", text: "Network error. Try again." });
        } finally {
            setLoading(false);
        }
    }

    if (configured === false) {
        return (
            <>
                <Cta href={PARAGRAPH_PUBLICATION_URL} target="_blank" rel="noopener noreferrer">
                    Subscribe on Paragraph ↗
                </Cta>
                <Status $tone="muted">Opens newsletter signup on Paragraph</Status>
            </>
        );
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
                        disabled={loading || configured === null}
                        required
                    />
                </Field>
                <Button type="submit" disabled={loading || configured === null || !email.trim()}>
                    {loading ? "…" : "Subscribe"}
                </Button>
            </Form>
            {status && <Status $tone={status.tone}>{status.text}</Status>}
        </>
    );
}
