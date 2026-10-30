# Patrick Marcotte

A single-page, static Astro site based on the supplied personal-site HTML. No React, client-side router, CMS, or server is required. Small client scripts enhance the email link with a copy button and the Places map with selection controls. The expandable career timeline, FAQs, and complete places transcript work without JavaScript; the map needs no third-party service or API key.

## Local development

Use Node.js 22.23.4+ (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the local URL Astro prints (normally `http://localhost:4321`).

```sh
npm run check    # Astro / TypeScript diagnostics
npm run build    # Check and generate dist/
npm run preview  # Serve the production build locally
```

Deploy `dist/` to any static host. Use `npm run build` as the build command; no environment variables are needed. Remove any previous SPA catch-all rewrite when deploying this version.

## Vercel

Production fallback: https://patrick-marcotte.vercel.app

Custom domain: https://patrickmarcotte.com (DNS and HTTPS verified). `www.patrickmarcotte.com` is configured as a permanent 308 redirect to the apex. Astro's `site`, canonical URL, and Open Graph URL use the custom domain.

DNS is managed at GoDaddy using `ns43.domaincontrol.com` and `ns44.domaincontrol.com`. The following records are configured; preserve unrelated records (especially email):

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 935c8c13c7ad8e26.vercel-dns-017.com |

Verify after DNS changes with `npx vercel domains verify patrickmarcotte.com --scope patrick-marcotte` and the same command for `www.patrickmarcotte.com`.

Workspace and project: `patrick-marcotte` (Hobby). The emptied `lessi-exp` workspace was renamed because Vercel does not permit deleting an account's only Hobby team. Its Supabase and Upstash resources and marketplace installations were removed.

```sh
npx vercel deploy --prod --scope patrick-marcotte
```

`vercel.json` specifies Astro, `npm run build`, and `dist/`. `.vercelignore` excludes local credentials and previous-site material from CLI uploads. Retired media lives in `archive/media/`, outside `public/`, so neither local nor Git-based builds publish it. The GitHub repository is connected; production has been published using the CLI command above.

## Editing

- `src/pages/index.astro` — homepage copy, links, metadata, and email-copy behavior.
- `src/styles.css` — typography, responsive layout, and system light/dark themes.
- `src/components/CareerTimeline.astro` — the dated, expandable career timeline, including the grouped Cambium roles. Uses native `details`/`summary` elements, with no client script.
- `src/components/PlacesMap.astro` — interactive route map with hover, tap, keyboard selection, and previous/next controls. Details stay below the map so they never obscure other places.
- `src/assets/places.svg` — original map geometry and numbered markers from the updated HTML.
- `src/data/places.json` — the seven place descriptions, in route order; keep marker indices in the SVG in sync if changing the route.
- `src/components/Questions.astro` and `src/data/questions.json` — native expandable FAQs. The page generates FAQ structured data from this same content to keep it in sync.
- `src/data/person.json` — biographical structured data from the updated HTML.
- `src/assets/patrick-marcotte.webp` — optimized square portrait from `Friendly Modern Professional Headshot.png`, with source metadata removed. Astro generates responsive images and the social-sharing JPEG. The opening pairs the circular portrait with the name, with the introduction spanning the row below.
- `public/favicon.png` — transparent 96×96 PM browser icon derived from `pm_icon.png`; bump the favicon URL version in `src/pages/index.astro` when replacing it to refresh browser caches.
- `public/apple-touch-icon.png` — original opaque personal-brand icon for Apple home screens.

The original wording and source links are retained; those biographical claims and external sources have not been independently verified.

## Search discovery

`src/pages/robots.txt.ts` and `src/pages/sitemap.xml.ts` generate crawl-discovery files from Astro's canonical `site` setting. The sitemap lists only the homepage. Homepage metadata includes a search title, social portrait, and linked Person/ProfilePage JSON-LD alongside the FAQ data.

```sh
npm run build && npm run test:seo
SITE_URL=https://patrickmarcotte.com npm run test:seo
```

Project-local SEO skills live in `.agents/skills/`. See [the SEO audit and submission checklist](docs/seo.md) for Google Search Console, Bing Webmaster Tools, and AI-search guidance. Technical checks do not prove indexing; verified owner-console submission and inspection are still required.

## Analytics

Google Analytics 4 uses measurement ID `G-2GYNB4DNN0`. The standard async Google tag is in `src/pages/index.astro`, included in production builds (including build previews), but excluded from `npm run dev`. It sends the default page-view event; there are no custom tracking events. Check GA's Realtime report after visiting the live site to confirm receipt. Analytics does not establish search indexing.

## Backup and restore

The current site is backed up on the `dev` branch of https://github.com/pbmarcotte1/pbm. The repository is public: never commit `.env*`, local Vercel credentials, or other secrets. `main` still contains the previous site; use `dev` to restore this version.

```sh
git clone --branch dev https://github.com/pbmarcotte1/pbm.git
cd pbm
npm ci
npm run build
npm run test:seo
```

The repository includes current copy, optimized images, source code, deployment configuration, and these setup notes. No database or environment variables are needed to rebuild the site. For deployment, sign in to Vercel and link the existing `patrick-marcotte` project in the `patrick-marcotte` workspace; do not create a second project. Domain ownership, Google Analytics, and webmaster-tool accounts remain managed in those services.

After future site changes, review `git status` and the diff, then commit and push `dev` again. Vercel deployments are useful for rollback but are not a replacement for this source backup.

## Previous site material

`src/content/`, `archive/media/`, the root image files, and the content-generation scripts are retained for possible reuse. They are not displayed or copied into the new site's build. `.vercelignore` also excludes them from CLI uploads. The old React UI and `/transcript/:id` routes have been retired.

The optional `transcribe` and `generate:work-example` commands belong to the previous content workflow and are not needed to develop or deploy this site. Their historical paths still reference `public/media/`; adapt those paths if reusing the archived material.
