# 🔧 Big Duct Comedy

> Original blue-collar comedy with a reality desk that separates fiction from official alerts.

A modern comedy website featuring fictional service call stories paired with a "Reality Desk" that shows real-time official emergency alerts from government sources.

![Big Duct Comedy](public/big-duct-logo.png)

## 🌟 Features

- **Daily Comedy Episodes** - Fictional HVAC/plumbing/service call stories with comic panel illustrations
- **Reality Desk** - Real-time alerts from official sources (NWS weather, USGS earthquakes)
- **Mobile-First Design** - Responsive, accessible, and fast
- **Edge Computing** - Built on Cloudflare Workers for global performance
- **SEO Optimized** - Open Graph, Twitter Cards, sitemap, and structured data
- **Error Handling** - Graceful fallbacks and loading states

## 🚀 Quick Start

**Want to launch immediately?** See [QUICKSTART.md](QUICKSTART.md)

**Want detailed hosting info?** See [DEPLOYMENT.md](DEPLOYMENT.md)

**Want to see what to improve?** See [IMPROVEMENTS.md](IMPROVEMENTS.md)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Build the site
npm run build

# Test the build
npm test
```

## 📁 Project Structure

```
big-duct-comedy-website/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with episodes
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── not-found.tsx      # 404 page
│   ├── alerts/            # Reality Desk
│   │   ├── page.tsx       # Alerts page (NWS + USGS)
│   │   ├── loading.tsx    # Loading state
│   │   └── error.tsx      # Error boundary
│   └── episodes/          # Episode pages
│       └── upstairs-problem/
│           ├── page.tsx           # Episode page
│           └── interactive-reader.tsx
├── public/                # Static assets
│   ├── big-duct-logo.png # Site logo
│   ├── favicon.svg        # Favicon
│   └── comic-*.png        # Episode images
├── worker/                # Cloudflare Worker
│   └── index.ts          # Worker entry point
├── db/                    # Database setup (Drizzle + D1)
│   ├── index.ts          # DB client
│   └── schema.ts         # DB schema
└── build/                # Build configuration
    └── sites-vite-plugin.ts

# Documentation
├── README.md             # This file
├── QUICKSTART.md         # Fast deployment guide
├── DEPLOYMENT.md         # Detailed hosting guide
├── IMPROVEMENTS.md       # Future enhancements
└── .env.example          # Environment variables template
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19 (Server Components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Hosting:** Cloudflare Workers/Pages (vinext)
- **Database:** Drizzle ORM + D1 (configured, not yet used)
- **APIs:** NWS Weather API, USGS Earthquake API
- **Build:** Vite 8

## 📊 Pages

- **`/`** - Homepage with episode grid and featured story
- **`/alerts`** - Reality Desk with live official alerts
- **`/episodes/upstairs-problem`** - Sample episode with interactive reader
- **`/sitemap.xml`** - Dynamic sitemap for SEO
- **`/robots.txt`** - Search engine directives

## 🎨 Design Philosophy

### Comedy vs. Reality Separation
The site clearly separates **fictional comedy** from **real-world information**:
- Comedy episodes are marked with "Fictional" and "Comedy" badges
- The Reality Desk has distinct branding and sources all data from official APIs
- No made-up emergencies or misinformation

### Branding
- **Blue-collar aesthetic** - Bold fonts, high contrast, comic book style
- **Trust indicators** - Official source badges, timestamps, verification levels
- **Mobile-first** - Thumb-friendly navigation, readable text sizes
- **Performance** - Edge computing, optimized assets, fast load times

## 🔌 APIs Used

### National Weather Service (NWS)
```
https://api.weather.gov/alerts/active
```
- Official US weather warnings
- Filtered for Severe/Extreme alerts
- Updates every 5 minutes

### USGS Earthquake Hazards
```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson
```
- Magnitude 4.5+ earthquakes
- Past 24 hours
- Global coverage

Both APIs are free, public, and require no authentication.

## 🚀 Deployment

### Recommended: Cloudflare Pages

This project is optimized for Cloudflare Pages:

1. Push to GitHub
2. Connect repository in Cloudflare Pages
3. Deploy with these settings:
   - **Build command:** `npm run build`
   - **Build output:** `.vinext/output`
   - **Node version:** 22.13.0+

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete guides to Cloudflare, Vercel, Netlify, and VPS hosting.

## 📈 What's Been Improved

✅ **SEO & Social**
- Open Graph and Twitter Card meta tags
- Sitemap and robots.txt
- Structured data (JSON-LD)
- Optimized titles and descriptions

✅ **User Experience**
- Loading states for async pages
- Error boundaries with retry
- Custom 404 page
- Mobile-responsive design

✅ **Documentation**
- Quick start guide
- Deployment guides for 4 platforms
- Environment configuration
- Future improvements roadmap

## 🔮 Future Improvements

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for a comprehensive list. Top priorities:

1. **Image Optimization** - Use Next.js Image component
2. **More Episodes** - Create archive and individual pages
3. **Analytics** - Add Plausible or Google Analytics
4. **RSS Feed** - For episode subscriptions
5. **Newsletter** - Email signup integration

## 🐛 Known Issues

- Alert feeds timeout after 4.5 seconds (by design - fail fast)
- Some images could use next/image optimization
- Database configured but not actively used yet

## 📄 License

© 2026 Big Duct Comedy. All rights reserved.

## 🤝 Contributing

Ideas for episodes or improvements? Open an issue or PR!

---

## vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Sites Lifecycle

The Sites lifecycle CLI runs the locked dependency install before returning this checkout. Edit the source under `app/`, then checkpoint when a coherent milestone is ready to inspect or share. The remote Sites builder runs `npm run build` against the pushed commit. Do not repeat install or build as a normal pre-checkpoint step.

This starter does not use `wrangler.jsonc`.

`install:ci` is intentionally a single, non-retrying `npm ci`. It refuses a concurrent install for the same project, consumes a matching image-seeded npm cache with `--prefer-offline` while retaining registry fallback for a missing cache object, otherwise downloads and verifies the complete vinext tarball recorded in `package-lock.json`, limits npm to one socket, and terminates a stalled install. `build` applies a short timeout and then validates the Sites artifact. These helpers target Linux and use GNU `timeout`; they are not native macOS scripts.

Scripts that need writable project-scoped home, npm, XDG, and temporary paths use `scripts/sites-env.sh`. The `dev` and `start` scripts honor the caller's runtime environment and keep Wrangler logs inside the checkout. The generated `.sites-runtime/` directory is disposable and ignored by Git.

## Included Shape

- edit site code under `app/`
- `app/chatgpt-auth.ts` provides optional dispatch-owned ChatGPT sign-in helpers
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Diagnostic Commands

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build and validate the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `npm test`: build, validate, and verify the rendered development-preview metadata
- `npm run validate:artifact`: recheck an existing artifact's manifest and ESM `default.fetch` export
- `npm run db:generate`: generate Drizzle migrations after schema changes

Use build and validation commands for targeted diagnosis after a remote failure, not as part of the normal checkpoint path.

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
