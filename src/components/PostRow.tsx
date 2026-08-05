import { PostItem, RowMeta, RowMetaBar, RowText, RowTitle } from "@/components/ui";
import type { ParagraphPost } from "@/lib/paragraph";

export default function PostRow({ post }: { post: ParagraphPost }) {
    return (
        <PostItem>
            <RowMetaBar>
                {post.publishedAtLabel && (
                    <RowMeta as="time" dateTime={post.publishedAt || undefined}>
                        {post.publishedAtLabel}
                    </RowMeta>
                )}
                {post.viewsLabel && <RowMeta>{post.viewsLabel} views</RowMeta>}
            </RowMetaBar>
            <RowTitle href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
            </RowTitle>
            {post.subtitle && <RowText>{post.subtitle}</RowText>}
        </PostItem>
    );
}
