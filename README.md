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

## Optional: Paragraph subscribe

Recent posts load from the public Paragraph API (no secrets).

To enable the on-site email form (otherwise a “Subscribe on Paragraph” link is shown):

1. Create an API key in Paragraph → Account Settings → Integrations  
2. Set `PARAGRAPH_API_KEY` in the Vercel project (or `.env.local` for local)

```bash
# .env.local
PARAGRAPH_API_KEY=your_key_here
```
