# Big Duct Comedy

> Original blue-collar comedy with a reality desk that separates fiction from official alerts.

Fictional HVAC / plumbing / electrical service-call stories paired with a **Reality Desk** that
pulls live official alerts from the National Weather Service and USGS, so the jokes are never
mistaken for the real thing.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- TypeScript
- Deployed on Vercel

## Routes

| Route | Rendering | Notes |
| --- | --- | --- |
| `/` | static | Homepage, episode index |
| `/episodes/upstairs-problem` | static | Animated comic reader (client component) |
| `/alerts` | dynamic | Reality Desk — live NWS + USGS feeds, `cache: "no-store"` |
| `/sitemap.xml` | static | Generated from `app/sitemap.ts` |
| `/not-found` | static | Custom 404 |

The Reality Desk fetches [api.weather.gov](https://api.weather.gov/alerts/active) and the
[USGS earthquake feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson)
on every request, with a 4.5s timeout and `Promise.allSettled` so one feed failing never blanks
the page. `app/alerts/loading.tsx` and `app/alerts/error.tsx` cover the loading and failure states.

## Local development

Requires Node 20.9+ (Node 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin used for `metadataBase`, Open Graph and Twitter image URLs. Defaults to `https://bigductcomedy.com`. |

## Deployment

The project is linked to Vercel. Pushes to `main` build and deploy automatically once the Git
integration is connected; otherwise deploy from the CLI:

```bash
npx vercel --prod
```

Build settings are the Next.js defaults — no custom build command or output directory needed.

## History

This repo previously carried a `vinext` + Cloudflare Workers adapter (`worker/`, `vite.config.ts`,
`wrangler.toml`), a Drizzle/D1 database layer, and a duplicated copy of the whole project under
`big-duct-comedy-website/`. None of it was referenced by the app — no route read from D1 — so it was
removed in favour of a plain Next.js build. It remains available in the Git history if needed.
