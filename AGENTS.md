# Copy conventions

- Use **lead / leads / led / leading**, not **run / runs / ran / running**, when describing Patrick's leadership of companies or business units. Apply this to visible copy, metadata, and structured data, including when importing updated HTML or Markdown that uses the older wording.
- This is contextual, not a global word replacement: phrases such as “Implementation runs through all of that work,” “the company ran on,” operational uses such as running caseloads, and commands such as `npm run build` are unrelated and should stay unchanged.
- Keep the hands-on-learning paragraph in “Now”: “I believe in learning through hands-on experience, and I occasionally write and present about what I’m learning.” Do not restore the older first-customer sentence in its place when importing copy.
- Keep the location in “Now” as “St. Paul, MN, USA.”
- The “Why did you leave Voyager Sopris?” FAQ and its entire answer were explicitly removed. Do not restore them when importing older copy unless Patrick explicitly asks.

# SEO maintenance

- For indexing and search-discovery work, read `.agents/skills/seo-audit/SKILL.md` and `.agents/skills/ai-seo/SKILL.md`. These project-local skills are guidance, not evidence of indexing or guaranteed ranking improvements; verify platform claims against official documentation.
- Preserve the canonical domain `https://patrickmarcotte.com/`, crawlable static HTML, `robots.txt`, sitemap, and metadata when importing new designs or copy. Keep structured data consistent with visible content.
- Keep the sitemap limited to real, canonical pages; do not add section anchors, legacy media, or fake modification dates.
- Run `npm run build && npm run test:seo` after SEO changes. Use `SITE_URL=https://patrickmarcotte.com npm run test:seo` to verify the deployed site.
- Search Console / Bing Webmaster Tools provide indexing evidence. Successful HTTP requests (even with bot user agents) only test access from our network, not verified crawler access or index inclusion. Do not promise inclusion in Google or ChatGPT.
