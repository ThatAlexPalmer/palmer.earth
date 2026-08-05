import { ProductItem, RowText, RowTitle, StatusBadge } from "@/components/ui";
import type { Product } from "@/data/products";

export default function ProductRow({ product }: { product: Product }) {
    return (
        <ProductItem>
            <RowTitle href={product.href} target="_blank" rel="noopener noreferrer">
                {product.name}
            </RowTitle>
            <StatusBadge $kind={product.status}>{product.status}</StatusBadge>
            <RowText>{product.blurb}</RowText>
        </ProductItem>
    );
}
