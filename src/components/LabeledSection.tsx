import type { ReactNode } from "react";
import { Section, SectionLabel } from "@/components/ui";

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
