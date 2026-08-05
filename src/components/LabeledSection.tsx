import type { ReactNode } from "react";
import { Section, SectionLabel } from "@/components/ui";

/** A page section headed by its mono `// Label`, wired up for screen readers. */
export default function LabeledSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
    const labelId = `${id}-label`;

    return (
        <Section aria-labelledby={labelId}>
            <SectionLabel id={labelId}>
                <span className="prefix">{"//"}</span>
                {label}
            </SectionLabel>
            {children}
        </Section>
    );
}
