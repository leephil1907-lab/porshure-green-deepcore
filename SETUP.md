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
existed nowhere else was `src/sections/HeroCarousel.tsx` (feature branch) — now included, giving
the integration tree 154 files vs `main`'s 151.

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
