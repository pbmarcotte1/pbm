import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const canonical = 'https://patrickmarcotte.com/';
const base = process.env.SITE_URL;
const root = new URL('../', import.meta.url);
const questions = JSON.parse(await readFile(new URL('src/data/questions.json', root), 'utf8'));

async function resource(path, expectedType, userAgent) {
  if (!base) return readFile(new URL(`dist/${path || 'index.html'}`, root));
  const response = await fetch(new URL(path, `${base.replace(/\/$/, '')}/`), {
    redirect: 'manual',
    headers: {
      'Cache-Control': 'no-cache',
      ...(userAgent ? { 'User-Agent': userAgent } : {}),
    },
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, 200, `${path || '/'} status (${userAgent || 'default'})`);
  assert(response.headers.get('content-type')?.includes(expectedType), `${path} content type`);
  assert(!/noindex|none/i.test(response.headers.get('x-robots-tag') || ''), `${path} X-Robots-Tag`);
  return Buffer.from(await response.arrayBuffer());
}

const html = (await resource('', 'text/html')).toString();
function meta(name) {
  const tag = [...html.matchAll(/<meta\s[^>]*>/g)]
    .map(match => match[0])
    .find(tag => tag.includes(`name="${name}"`) || tag.includes(`property="${name}"`));
  assert(tag, `Missing ${name} metadata`);
  return tag.match(/content="([^"]*)"/)?.[1];
}
assert(html.includes(`<link rel="canonical" href="${canonical}"`));
assert.match(html, /<title>Patrick Marcotte[^<]*Lessi<\/title>/);
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
assert(meta('description').includes('Patrick Marcotte'));
assert.equal(meta('og:url'), canonical);
assert(!/noindex|nofollow|none/i.test(meta('robots')));
assert(!/<meta[^>]+(?:name="(?:googlebot|bingbot)"[^>]+content="[^"]*(?:noindex|none)|content="[^"]*(?:noindex|none)[^"]*"[^>]+name="(?:googlebot|bingbot)")/i.test(html));
assert(html.includes('I co-founded it and serve as CEO.'), 'Core content must be in initial HTML');
assert(!html.includes('Why did you leave Voyager Sopris?'));

const schemaMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
assert(schemaMatch, 'Static JSON-LD');
const schema = JSON.parse(schemaMatch[1]);
const person = schema.find(item => item['@type'] === 'Person');
const profile = schema.find(item => item['@type'] === 'ProfilePage');
const faq = schema.find(item => item['@type'] === 'FAQPage');
assert.equal(person.name, 'Patrick Marcotte');
assert.equal(person.url, canonical);
assert.equal(profile.url, canonical);
assert.equal(profile.mainEntity['@id'], person['@id']);
assert.equal(person.mainEntityOfPage['@id'], profile['@id']);
assert.deepEqual(faq.mainEntity, questions.map(({ question, paragraphs }) => ({
  '@type': 'Question', name: question,
  acceptedAnswer: { '@type': 'Answer', text: paragraphs.join(' ') },
})));

const image = new URL(meta('og:image'));
assert.equal(image.origin, new URL(canonical).origin);
assert.equal(meta('twitter:image'), image.href);
assert.equal(person.image, image.href);
const jpeg = await resource(image.pathname.slice(1), 'image/jpeg');
assert.equal(jpeg.subarray(0, 3).toString('hex'), 'ffd8ff', 'Social image is a real JPEG');

const robots = (await resource('robots.txt', 'text/plain')).toString();
assert.match(robots, /^User-agent: \*$/m);
assert.match(robots, /^Allow: \/$/m);
assert(!/^Disallow:\s*\S/m.test(robots));
assert(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
const sitemap = (await resource('sitemap.xml', 'xml')).toString();
assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), [canonical]);

if (base) {
  for (const bot of ['Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User']) {
    const botHtml = (await resource('', 'text/html', bot)).toString();
    assert(botHtml.includes('I co-founded it and serve as CEO.'), `${bot}: no challenge page`);
  }
}
console.log(`PASS SEO checks (${base || 'dist/'}): canonical, metadata, static content, linked Person/ProfilePage, FAQ parity, social image, robots, sitemap${base ? ', and bot-user-agent probes' : ''}.`);
console.log('These checks verify technical access and configuration, not search-engine index inclusion.');
