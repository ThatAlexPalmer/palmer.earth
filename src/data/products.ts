import type { StatusKind } from "@/components/ui";
import type { NestStats } from "@/lib/nest";

export type Product = {
    name: string;
    href: string;
    status: StatusKind;
    blurb: string;
};

export function buildProducts(nest: NestStats): Product[] {
    return [
        {
            name: "Plume",
            href: "https://plume.org",
            status: "work",
            blurb: "Public blockchain for scaling real-world assets. Head of Regulatory Product Strategy.",
        },
        {
            name: "Nest",
            href: "https://nest.credit",
            status: "live",
            blurb: `Anyone with a wallet can earn from RWAs — now ${nest.totalHoldersLabel} wallets and ${nest.totalTvlLabel} TVL across Nest. Helped make Plume top chain by RWA holders.`,
        },
        {
            name: "Visualize Laws",
            href: "https://visualizelaws.com",
            status: "live",
            blurb: "Explore ~2.2M U.S. local laws — search, filter, map. Financial / state / federal next.",
        },
        {
            name: "Transfer Agent Protocol",
            href: "https://transferagentprotocol.xyz",
            status: "oss",
            blurb: "Open-source infrastructure for tokenized cap tables powering Plume's transfer agent.",
        },
    ];
}
