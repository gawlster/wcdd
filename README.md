# West Coast Diamond Detail

Marketing site for a mobile auto-detailing business: a single landing page (hero, service
packages, quote request form) plus a password-protected `/admin` page for reviewing quote
requests.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Prisma 7 + PostgreSQL · zod

## Getting started

```bash
cp .env.example .env      # then fill it in (or `npm run linkenv` inside a worktree)
npm install               # also generates the Prisma client
npx prisma migrate deploy # bring your dev database up to date
npm run dev
```

Open http://localhost:3000. The admin page is at http://localhost:3000/admin and uses the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`.

### Environment variables

| Variable         | Purpose                          |
| ---------------- | -------------------------------- |
| `DATABASE_URL`   | Postgres connection string       |
| `ADMIN_USERNAME` | Basic-auth username for `/admin` |
| `ADMIN_PASSWORD` | Basic-auth password for `/admin` |

Point `DATABASE_URL` at a **dev** database locally. `prisma migrate dev` can offer to reset
the database it runs against.

## Project structure

```
src/
  app/                 Routes: layout.tsx (fonts, metadata), page.tsx (landing), admin/
  actions/             Public server actions (contact form submission)
  components/landing/  Landing page sections
  components/ui/       Shared UI primitives (Button, Input, Eyebrow)
  content/             Business details and service packages; edit copy here
  lib/                 Prisma client, env, auth, validation schema, rate limiting
  proxy.ts             Basic auth for /admin
prisma/                Schema and migrations
```

Styling uses Tailwind with the brand tokens and responsive type scale (`type-sm` …
`type-3xl`) defined in `src/app/globals.css`.

## Admin auth

`src/proxy.ts` puts `/admin` behind HTTP Basic auth. Server actions can be invoked from any
path, so admin actions also check credentials themselves (`isAdminRequest()` in
`src/lib/auth.ts`). Do the same in any new admin action.

## Database changes

1. Edit `prisma/schema.prisma`.
2. Against your dev database: `npx prisma migrate dev --name <name>`. Add `--create-only`
   to review or edit the SQL first, e.g. to backfill data.
3. Commit the generated folder in `prisma/migrations/`.
4. Before merging to `main`, apply it to production by hand; nothing in the deploy does
   this. Check with `DATABASE_URL="<prod url>" npx prisma migrate status`, then run
   `DATABASE_URL="<prod url>" npx prisma migrate deploy`.

Migrations run while the previous release is still serving traffic, so destructive changes
(dropping or renaming columns/tables) ship in two releases: first add the new shape and
stop using the old one, then drop the old one in a later release. The `responded_at` and
`drop_has_responded` migrations are an example of exactly this.

## Scripts

| Script                 | Does                                 |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Dev server                           |
| `npm run build`        | Production build                     |
| `npm run start`        | Serve the production build           |
| `npm run lint`         | ESLint                               |
| `npm run format`       | Prettier (write)                     |
| `npm run format:check` | Prettier (check only, for CI)        |
| `npm run linkenv`      | Symlink `../../.env` into a worktree |
