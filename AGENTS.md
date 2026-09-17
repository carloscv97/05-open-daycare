<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## App Map

- This is a single Next.js 16 App Router app using React 19, strict TypeScript, and npm (`package-lock.json`). Use the `@/*` alias for root imports.
- Routes live in `app/`: `/` is the feed; `/login`, `/activate-account`, `/kids`, and `/kids/[slug]` are implemented. `app/layout.tsx` owns document setup and global styles.
- Keep components within their domain under `components/auth`, `components/home`, or `components/kids`; use `components/shared` only for genuine cross-domain UI.
- `lib/mock-feed.ts` and `lib/mock-kids.ts` are the current UI data sources. `references/screenshots/` and `references/pantallas/` are visual/reference material, not compiled app code.
- Styling is Tailwind CSS 4, imported in `app/globals.css`; there is no Tailwind config file.

## Verification

- `npm run dev` starts the development server. `npm run build` is the production build and the available type-checking verification; no test suite or standalone typecheck script exists.
- `npm run lint` runs ESLint across the repository and currently fails on two pre-existing errors in `references/pantallas/support.js`. Do not attribute those reference-file failures to application changes.

## UI Expectations

- Actionable controls need `cursor-pointer`, hover feedback, and a visible `focus-visible` state. Do not apply `cursor-pointer` to text inputs.
