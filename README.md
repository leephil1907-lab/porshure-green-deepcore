# Porshure Green

Premium document preparation, formatting, conversion, and submission support.

## Stack

React · TypeScript · Vite · Hono · tRPC · Drizzle ORM · PostgreSQL

## Development

```bash
npm install
npm run dev
```

## Production

Build and run on a traditional Node.js host:

```bash
npm run build
npm start
```

Vercel uses the dedicated serverless entry point at `api/vercel.ts`. Do not point a Vercel function at `api/boot.ts`: that entry point is reserved for local development and traditional Node.js hosting.

## Production environment

Configure these values in the hosting provider's production environment:

- `DATABASE_URL`: PostgreSQL connection string (Neon is supported).
- `ADMIN_EMAIL`: administrator login email.
- `ADMIN_PASSWORD_HASH`: bcrypt hash of the administrator password; never use plaintext.
- `ADMIN_JWT_SECRET`: random secret of at least 32 characters.
- `APP_ID` and `APP_SECRET`: required only if Kimi OAuth is enabled.

The public site can return its built-in default content when `DATABASE_URL` is absent, but persistent CMS edits, inquiry storage, and the admin dashboard require a configured database.

## Database setup

For a new PostgreSQL database, apply the SQL migrations in order:

1. `db/migrations/0001_site_content.sql`
2. `db/migrations/0002_core_tables.sql`

Alternatively, after setting `DATABASE_URL`, run `npm run db:push` from a trusted development environment. Back up an existing database before applying schema changes.

## Health check

After deployment, verify:

- `/api/health` returns `200` with `{ "ok": true }`.
- `/api/trpc/content.get` responds with the site content.
- `/login` loads and administrator login succeeds after credentials are configured.
- `/admin` remains protected until a valid administrator session is present.

See `.env.example` for the complete environment-variable list.

<!-- redeploy: rotated admin session secret -->
