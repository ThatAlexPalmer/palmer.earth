# Personal website

Live site: [palmer.earth](https://palmer.earth)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm tsc --noEmit
pnpm build
```

## Paragraph subscribe (required for the form)

The writing section posts to Paragraph’s official API:

```http
POST https://public.api.paragraph.com/api/v1/subscribers
Authorization: Bearer <PARAGRAPH_API_KEY>
Content-Type: application/json

{ "email": "reader@example.com" }
```

Docs: [Add a new subscriber](https://paragraph.com/docs/api-reference/subscribers/add-a-new-subscriber)

1. Generate a key in [publication settings → Developer](https://paragraph.com/settings/publication/#developer)
2. Local:

```bash
# .env.local
PARAGRAPH_API_KEY=your_key_here
```

3. Production: set `PARAGRAPH_API_KEY` on Vercel (or your host), then redeploy.

Without the key, the form still renders but subscribe returns an error.
