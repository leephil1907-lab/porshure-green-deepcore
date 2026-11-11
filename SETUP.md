# Porshure Green — integration build

Imported from `github.com/leephil1907-lab/porshure-green-deepcore` with **every branch**, merged into
one tree, built and running.

## Branches

All 6 upstream branches are present locally, plus a local integration branch:

`main` · `design/multipage-brand-refresh` · `fix/brand-login-hero` ·
`fix/vercel-serverless-api-runtime` · `production/premium-site-admin-cms` ·
`feature/enhance-reviews-mobile-animations` · **`integration/all-branches`** ← checked out, running

Full per-branch inventory (and the corrected analysis of what each branch really adds):
`/home/user/branches/BRANCHES.md`. Plain-file copies of every branch: `/home/user/branches/<branch>/`.

**Union result:** `main` was already a superset of 4 of the 5 side branches. The only file that
existed nowhere else was `src/sections/HeroCarousel.tsx` (feature branch) — an older three.js hero
that duplicates `Hero` + `ImageCarousel`. It was merged in, then removed as a duplicate along with
the other orphan sections, so the final tree is 148 files vs `main`'s 151 (3 net fewer, no dead
code). `gsap`, `lenis`, `three` and `@types/three` were dropped with it.

## Status: running

| Piece | Where |
|---|---|
| Vite dev server (site + `/api/trpc`) | `http://localhost:3000` (live preview in Arena) |
| PostgreSQL 17 | `127.0.0.1:5544`, data dir `/home/user/.pgdata` |
| Database | `porshure` (role `app`) |
| Schema | `users`, `inquiries`, `site_content` + enums `role`, `inquiry_status` |

Routes: `/` `/services` `/about` `/contact` `/login` `/admin` (+ SPA catch-all).

## Admin login

`/admin` · `admin@porshuregreen.com` · `Porshure2026!`

Rotate: `node -e "console.log(require('bcryptjs').hashSync('NEW_PASSWORD', 10))"` → paste into
`ADMIN_PASSWORD_HASH` in `.env` → restart.

## Commands

```bash
npm run dev        # site + API on :3000
npm run db:local   # (re)start local Postgres — idempotent, needed after a sandbox restart
npm run db:push    # sync db/schema.ts into the database
npm run db:seed    # insert default site_content row
npm run check      # typecheck
npm run build      # production build (dist/public + dist/boot.js)
npm start          # serve the production build
```

## Local changes on `integration/all-branches`

Committed as `9ac32a0`:

1. `src/sections/HeroCarousel.tsx` — the one branch-only file, pulled in from
   `feature/enhance-reviews-mobile-animations`.
2. `vite.config.ts` — `host: 0.0.0.0`, `allowedHosts: true`, `preview` block (otherwise the dev
   server 403s the preview hostname).
3. `api/queries/connection.ts` — driver-aware: Neon URL → `drizzle-orm/neon-http`; any other
   Postgres (Supabase, RDS, local, Docker) → `postgres.js` with `prepare: false`, safe behind
   Supabase's pgbouncer pooler.
4. `db/seed.ts` — was a TODO stub, now seeds the default `site_content` row.
5. `scripts/local-db.sh` + `db:local` / `db:seed` npm scripts.

## Vercel

Project `porshure-green-deepcore` (`prj_rzB77Hktya436P4CaRyU2Rx3O71f`, team
`team_86BneTed80LMhbupeUcrRBTd`), linked to `leephil1907-lab/porshure-green-deepcore`, framework
`vite` with a custom `vercel.json` (builds `api/boot.ts` as a Node function + static `dist/public`).

- Production aliases: `www.porshuregreen.xyz`, `porshuregreen.xyz`, `porshure-green-deepcore.vercel.app`
  — currently serving commit **`525358d`**, i.e. two commits behind `main` (`3e1d815`).
- Latest preview: `fix/brand-login-hero` (`4e317f7`) → READY.
- `design/multipage-brand-refresh` (`134b3bb`) → **ERROR**: `src/pages/Login.tsx`, JSX syntax error
  at 108:4 ("Adjacent JSX elements must be wrapped in an enclosing tag").

Deploying the integration branch needs a push to GitHub (no git credentials in this sandbox), or a
Vercel token. The Vercel connector can deploy straight from a GitHub ref if you want that.

## Verified

- `tsc -b` clean · `npm run build` OK · `npm start` serves SPA + API
- `/` `/services` `/about` `/contact` `/login` `/admin` → 200, all page modules transform without error
- `content.get` reads Postgres · `inquiry.create` persists · `login.login` issues the admin cookie


## Design + behaviour pass (commit `ac1aace`)

The site was half-migrated from an abandoned theme. Fixed:

| Issue | Before | After |
|---|---|---|
| Palette | 7 sections on old `#3DDC84`/`#1A1A2E` | brand tokens `#43845F`/`#1D3328`/cream |
| Type | `Inter` + `Playfair Display` never loaded → `/services` and testimonials rendered in a different typeface | Manrope (headings) / DM Sans (body) everywhere |
| Pricing cards | **invisible** (GSAP reveal never fired, stuck at `opacity:0`) | `IntersectionObserver` reveal, cannot strand content |
| Review list | **invisible** on `/about` for the same reason | same fix |
| Floating WhatsApp | component existed but was mounted nowhere | mounted on all public routes |
| Review screenshots | 3 broken image links | hidden gracefully (`onError`) |
| `content.get` | any DB error → whole site 503 | falls back to approved defaults |
| `.grid-bg` | referenced but never defined | defined |
| `code-path` debug attrs | shipped in the production bundle | dev only |
| Dead code | 7 orphan sections/components + 4 unused deps | removed |

Verified with a headless browser on the production build: 0 sections hidden, 0 page errors, 0
broken images, `/`, `/services`, `/about`, `/contact`, `/login`, `/admin` all render, contact form
persists to `inquiries`, admin login reaches the dashboard.

## Getting it live

Production is served from GitHub `main`. This branch is committed locally only:

```
release/porshure-green-deepcore-integration.bundle   # full branch, fetchable
release/patches/000{1,2}-*.patch                     # or apply the two commits
```

```bash
git fetch /path/to/porshure-green-deepcore-integration.bundle integration/all-branches
git push origin integration/all-branches:main   # then Vercel auto-deploys
```

Production was deliberately **not** redeployed during this pass: the only refs Vercel can build
are the ones already on GitHub, and `main` still contains the invisible-pricing/review bugs.

## Round 2 polish (motion, dead clicks, admin)

- Navigation: Services mega-dropdown (desktop hover/focus, mobile accordion share one `serviceMenu`
  source), animated active-link underline, scroll-progress bar, Escape close, body scroll lock.
- Pages: `ScrollManager` retries anchor targets on later frames, so in-page links work even while the
  page transition is still mounting. `AnimatePresence` route transitions; hero staggered CSS entrance;
  trusted-by marquee; animated counters in the samples strip.
- Dead-click fixes: `#contact` CTA replaced with WhatsApp; WhatsApp/tel links now strip non-digits
  correctly (`/\\D/g` typo in ContactPage, CTABanner, FAQ produced `wa.me/+1 (814) ...` links).
- Admin: tabbed dashboard (Inquiries / Website content / Invoice maker) with a "new" badge, quick
  action cards, client-side back link, accessible labels on every row action, and real newlines in the
  reply mailto body.

### Deployment notes

- `/api/health` reports `config.database`, `config.adminEmail`, `config.adminPasswordHash` and
  `config.adminJwtSecret` as booleans so a broken production deployment is one request away.
- `ADMIN_JWT_SECRET` must be at least 32 bytes, otherwise the admin login endpoint answers
  "Administrator authentication is not configured".
- Server imports in `api/`, `db/` and `contracts/` use explicit relative paths with `.js`
  extensions: Vercel type-checks functions with `nodenext`, which rejects `@db/*` aliases.

### Secret hygiene

- Store every credential (`ADMIN_JWT_SECRET`, `ADMIN_PASSWORD_HASH`, `ADMIN_EMAIL`, `DATABASE_URL`,
  `APP_ID`, `APP_SECRET`) as a **Sensitive** Vercel env var, never as *encrypted*/"config":
  encrypted vars are readable through the API and Vercel flags them with `securityIssues:
  ["readable-secret"]`.
- Sensitive vars cannot be read back or edited in place — to rotate one, delete it and create it
  again with the same key, then deploy. That is the intended workflow, not a bug.
- Verify deployments through `/api/health`'s boolean flags; there is no reason to read a secret
  value back to check it.
