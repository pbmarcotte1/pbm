# Search and AI discovery

## Audit: October 29, 2026

This is Patrick Marcotte's single-page professional profile. Primary discovery targets are his name, his role at Lessi, and his education-technology leadership background. Preserve the personal voice; do not add keyword-stuffed copy or generic SEO pages.

### Observed before this change

- The production homepage returned HTTP 200, including requests with Googlebot and OAI-SearchBot user agents. These are requests from our network, not verified crawler IPs.
- No `noindex` directive was found in the homepage HTML or response headers.
- HTTP and `www` redirected permanently to `https://patrickmarcotte.com/`; the canonical matched.
- Biography, career entries, and FAQs were in the initial HTML, with Person and FAQPage JSON-LD. JavaScript was not required to read them.
- `/robots.txt`, `/sitemap.xml`, and `/sitemap-index.xml` returned 404. A missing robots file does **not** itself block indexing, but there was no sitemap discovery path.
- The page title was only the name; social metadata had no image.
- No authenticated Search Console or Bing Webmaster Tools evidence was available. **Indexing status remains unconfirmed.** A ChatGPT answer or a `site:` search alone cannot settle it.

### Implemented

- `/robots.txt`: one wildcard allow policy, preserving the site's previously open crawling policy, plus an absolute sitemap URL. This permits both search and training crawlers that obey robots.txt; training opt-outs can be chosen separately without blocking OAI-SearchBot.
- `/sitemap.xml`: the one canonical page, generated from Astro's `site` configuration. No fragment URLs, legacy media, invented `lastmod`, or unnecessary dependencies.
- Descriptive title: `Patrick Marcotte | Co-founder & CEO of Lessi`.
- Absolute JPEG portrait metadata for Open Graph and Twitter cards.
- Linked Person and ProfilePage identities. Person `sameAs` identifies Patrick's LinkedIn profile; Lessi belongs under `worksFor`, not as an equivalent identity for Patrick.
- Regression checks for static content, canonical URL, metadata, JSON-LD relationships, FAQ parity, image, robots, sitemap, and optional live bot-user-agent probes.
- Project-local `seo-audit` and `ai-seo` skills from `coreyhaines31/marketingskills`; the installer records sources in `skills-lock.json`. The skills guide development, not the website runtime. Their platform claims still need source verification.

## Highest-priority remaining work: owner verification and submission

### Google Search Console

1. Open https://search.google.com/search-console/ under Patrick's Google account.
2. Add a **Domain property** for `patrickmarcotte.com`.
3. Complete GoDaddy ownership verification (automatic if offered, otherwise the supplied DNS TXT record). Preserve existing A, CNAME, MX, and unrelated TXT records. Never guess the verification token.
4. Under **Sitemaps**, submit `https://patrickmarcotte.com/sitemap.xml`.
5. Inspect `https://patrickmarcotte.com/` with **URL Inspection**, run **Test Live URL**, then **Request indexing**.
6. Recheck the indexed URL report after processing. A successful live test means the page is accessible, not that it is already indexed. Check the selected canonical and any exclusion reason.

### Bing Webmaster Tools

1. Open https://www.bing.com/webmasters/ under Patrick's account.
2. Import the verified Search Console property or complete Bing's offered verification method.
3. Submit `https://patrickmarcotte.com/sitemap.xml`.
4. Inspect and submit `https://patrickmarcotte.com/` for indexing.

These account actions are **not completed by deploying the site**. There is no supported public Google sitemap-ping shortcut, and Google's Indexing API is not intended for ordinary personal-profile pages. Indexing requests do not guarantee inclusion or a completion date.

## Identity and reputation

- Add the canonical website URL to Patrick's LinkedIn contact/website field.
- Where editorially appropriate, link Patrick's Lessi bio and other existing speaker/author biographies to this site. These are recommendations, not changes already made.
- Keep name, role, company, and biography facts consistent across those profiles.
- Do not buy links, fabricate mentions, or create artificial reviews or Wikipedia coverage.

## ChatGPT and other AI search

- OpenAI documents `OAI-SearchBot` as its search crawler. `GPTBot` is a separate training control; allowing training is not required for search discovery.
- `ChatGPT-User` handles some user-triggered page visits; it is not the automatic search-index crawler.
- A model answering without web search may not know this recently published site. Even with browsing, an answer can be stale or mistaken.
- Test direct retrieval by supplying the full URL in a browsing-enabled conversation, separately from discovery queries such as “Who is Patrick Marcotte, co-founder of Lessi?” Verify the cited URL and facts.
- Allowing bots is necessary for relevant crawling but does not guarantee retrieval, citation, or ranking. User-agent probes also do not prove that the CDN permits every provider IP; investigate verified bot requests if webmaster reports show access errors.
- No `llms.txt`, special AI schema, or extra AI-only copy is required for Google AI features. A second content mirror is not needed for this small static page; prioritize discovery and verified indexing first.

Official references:
- Google indexing requests: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots

## Ongoing verification

```sh
npm run build
npm run test:seo
SITE_URL=https://patrickmarcotte.com npm run test:seo
```

Check Search Console and Bing after submission and meaningful content changes. Monitor branded impressions and clicks over time; record AI-search tests with dates and cited URLs rather than treating a single answer as definitive. Preserve these technical basics during future imports.
