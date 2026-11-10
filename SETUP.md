# Porshure Green — local run notes

Imported from `github.com/leephil1907-lab/porshure-green-deepcore`, **all branches**, and brought up
fully stacked (frontend + tRPC API + real PostgreSQL).

## Import

- Full clone (no `--depth`, all refs) at `/home/user/porshure-green-deepcore` — `main` checked out.
- All 6 branches exist locally and tracking: `main`, `design/multipage-brand-refresh`,
  `fix/brand-login-hero`, `fix/vercel-serverless-api-runtime`,
  `production/premium-site-admin-cms`, `feature/enhance-reviews-mobile-animations`.
- Each branch's full working tree is also extracted as plain files under `/home/user/branches/`
  — see `/home/user/branches/BRANCHES.md` for the inventory and which files are branch-only.
- Running commit: `main` @ `3e1d815` *Complete Porshure Green global website refresh*.

## Status: running

| Piece | Where |
|---|---|
| Vite dev server (site + `/api/trpc`) | `http://localhost:3000` (live preview in Arena) |
| PostgreSQL 17 | `127.0.0.1:5544`, data dir `/home/user/.pgdata` |
| Database | `porshure` (role `app`) |
| Schema | `users`, `inquiries`, `site_content` + enums `role`, `inquiry_status` |

## Admin login

- URL: `/admin` · Email: `admin@porshuregreen.com` · Password: `Porshure2026!`

Rotate the password with:

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_NEW_PASSWORD', 10))"
# paste into ADMIN_PASSWORD_HASH in .env, restart
```

## Everyday commands

```bash
npm run dev        # site + API on :3000
npm run db:local   # (re)start local Postgres — idempotent, run after a sandbox restart
npm run db:push    # sync db/schema.ts into the database
npm run db:seed    # insert default site_content row
npm run check      # typecheck
npm run build      # production build (dist/public + dist/boot.js)
npm start          # serve the production build on :3000
```

## Local patches applied on top of `main`

1. **`vite.config.ts`** — `host: 0.0.0.0`, `allowedHosts: true`, `preview` block. Without it the dev
   server answers `403 Blocked request` for the preview hostname.
2. **`api/queries/connection.ts`** — upstream only used `drizzle-orm/neon-http`, which speaks
   *exclusively* to Neon's HTTP endpoint and cannot reach Supabase. It now picks the driver from
   `DATABASE_URL`: Neon URL → neon-http (unchanged), anything else (Supabase, RDS, local, Docker) →
   `postgres.js` with `prepare: false` (safe behind Supabase's pgbouncer pooler).
3. **`db/seed.ts`** — upstream was a TODO stub; now inserts the default `site_content` row.
4. **`scripts/local-db.sh`** + npm scripts `db:local`, `db:seed` — one-command local database.
5. **`.env`** — created locally (gitignored): `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`,
   `ADMIN_JWT_SECRET`. OAuth (Kimi) left blank = disabled.

Nothing else was touched; the earlier `Reviews.tsx` type error is already fixed upstream on `main`.

## Switching to Supabase

Env only, no code change:

```env
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

then `npm run db:push && npm run db:seed`.

**Blocker:** the connected Supabase account is on the free plan with 3 projects
(`mike-interiors-cms` + `Axi-Trader` paused, `Degreensacre` active), so a 4th project is refused.
Delete/pause one, upgrade the org, or point `DATABASE_URL` at an existing project.

## Verified on this commit

- `/`, `/login`, `/admin` → 200
- `content.get` reads the DB (new global hero copy from `3e1d815`)
- `login.login` → success with the admin credentials above, 401 on a bad password
- `inquiry.create` → `inquiry.list` / `inquiry.stats` persist and require a session
- `tsc -b` clean · `npm run build` succeeds · `npm start` serves the SPA + API
