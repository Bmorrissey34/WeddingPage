# Repository Instructions

## Project Overview
- This is a Next.js 16 App Router wedding website prototype built with React 19, TypeScript, Tailwind CSS v4, and shadcn/base-nova UI primitives.
- The site is mostly static and content-driven. Core wedding content lives in `lib/wedding-data.ts`.
- RSVP/admin data is mocked locally in `lib/rsvp-data.ts`. There is no real backend, persistence layer, auth system, or API wiring yet.

## Architecture
- `app/` contains route pages for the public site plus `/admin`.
- `components/` contains shared sections and feature components.
- `components/ui/` contains generated shadcn/base-nova primitives. Prefer treating these as shared infrastructure and avoid editing them unless a task truly requires it.
- `public/images/` contains the content imagery used across the site.
- `lib/utils.ts` exposes the shared `cn()` helper.

## Design System And Styling
- Global styling and theme tokens live in `app/globals.css`.
- The visual language is deliberate and already established: navy, ivory, sage, and burgundy with serif-heavy editorial typography.
- Fonts are configured in `app/layout.tsx` with `Cormorant Garamond` for headings and `Inter` for body copy.
- Preserve the current aesthetic when making changes. Avoid generic app-like UI patterns that would clash with the wedding/editorial feel.
- Reuse existing color variables like `--navy`, `--sage`, `--accent`, and `--burgundy` instead of hardcoding new palette values.

## Routing And Page Patterns
- Public pages generally follow this pattern:
  - `PageHeader` for the top hero band on interior routes
  - `SectionHeading` for section intros
  - content mapped from arrays in `lib/wedding-data.ts`
- `SiteHeader` and `SiteFooter` are rendered globally in `app/layout.tsx`.
- Public chrome is intentionally hidden on `/admin` by checking `usePathname()` in the header and footer components.

## Data Conventions
- Keep wedding content centralized in `lib/wedding-data.ts` whenever possible instead of scattering strings across route files.
- Keep RSVP/admin mock behavior centralized in `lib/rsvp-data.ts` and `components/admin-dashboard.tsx`.
- If content changes affect dates, venues, hotel details, attire, or logistics, update every dependent section so the story stays internally consistent.

## Component Conventions
- Use the `@/` path alias.
- Follow existing component style:
  - simple local helper components inside route/component files are acceptable
  - mapping arrays to cards/sections is the dominant pattern
  - client components are used only where interactivity is needed
- When linking with the project `Button` component, the existing pattern is:
  - `render={<Link href="..." />}`
  - `nativeButton={false}`

## Important Known Issues
- `app/rsvp/page.tsx` references `wedding.coupleShort`, but that property does not exist in `lib/wedding-data.ts`.
- `components/admin-dashboard.tsx` uses `text-[var(--gold)]`, but `--gold` is not defined in `app/globals.css`.
- `next.config.mjs` has `typescript.ignoreBuildErrors = true`, so TypeScript problems may be hidden during builds.
- The `lint` script exists in `package.json`, but `eslint` is not installed, so `npm run lint` currently fails.
- Wedding dates are inconsistent across the repo:
  - `wedding.dateISO` / `dateLong` point to November 14, 2026
  - schedule items, FAQ copy, and travel/weather copy still reference May 2026
- Several flows are explicitly mock/demo only:
  - RSVP submit only logs locally
  - admin auth is frontend-only
  - admin edits/deletes/export operate on in-memory browser state

## Editing Guidance
- Prefer updating shared data first, then page copy/components that consume it.
- For content changes, check all of these files for drift:
  - `lib/wedding-data.ts`
  - `app/page.tsx`
  - `app/story/page.tsx`
  - `app/schedule/page.tsx`
  - `app/travel/page.tsx`
  - `app/venues/page.tsx`
  - `app/faq/page.tsx`
  - `app/rsvp/page.tsx`
- For admin/RSVP work, verify both:
  - the guest-facing RSVP form in `components/rsvp-form.tsx`
  - the mock admin dashboard in `components/admin-dashboard.tsx`
- Preserve responsive behavior. Most layouts are built around `max-w-*`, grid/flex switches, and `sm`/`md`/`lg` breakpoints.

## Verification Guidance
- Since linting is not currently wired correctly, do not assume the repo has automated validation in place.
- When making code changes, manually sanity-check for:
  - missing data fields referenced by pages/components
  - color variables used but not defined
  - content/date mismatches across pages
  - client/server boundary issues in App Router files

## High-Value Future Improvements
- Normalize all wedding date references from one canonical source.
- Add real validation/build checks by installing and configuring ESLint.
- Remove `ignoreBuildErrors` once the current type issues are resolved.
- Replace demo-only admin/auth/RSVP behavior with a real backend when the project is ready.
