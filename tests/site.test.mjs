import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { load } from 'cheerio';
import { legacyRoutes, sectionRedirects } from '../src/legacy-routes.mjs';

const base = new URL('https://mitojs.github.io/mito-doc/');
const legacyHeadings = JSON.parse(readFileSync(new URL('./legacy-headings.json', import.meta.url)));
const entries = readdirSync('src/content/docs', { recursive: true })
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, '').replace(/(^|\/)index$/, '').replace(/\/$/, ''));
const published = new Map(entries.map((route) => {
  const relative = route ? route + '/' : '';
  return [new URL(relative, base).href, load(readFileSync(join('dist', relative, 'index.html')))];
}));

test('each article has a real translation, static content and a search preview', () => {
  for (const [page, $] of published) {
    const pathname = new URL(page).pathname;
    const chinese = pathname.startsWith(base.pathname + 'zh-CN/');
    const peer = chinese ? page.replace('/zh-CN/', '/') : page.replace(base.href, base.href + 'zh-CN/');
    assert.ok(published.has(peer), peer);
    const locale = chinese ? 'zh-CN' : 'en';
    assert.equal($('html').attr('lang'), locale, page);
    assert.equal($('main').attr('lang'), locale, 'unexpected fallback on ' + page);
    assert.equal($('main h1').length, 1, page);
    assert.ok($('main').text().trim().length > 80, page);
    assert.ok($('title').text().length > 5 && $('meta[name="description"]').attr('content'), page);
    assert.deepEqual($('link[rel="canonical"]').map((_, e) => $(e).attr('href')).get(), [page], page);
    assert.equal($('link[hreflang="' + (chinese ? 'en' : 'zh-CN') + '"]').attr('href'), peer, page);
    assert.ok($('a[hreflang]').toArray().some((a) => new URL($(a).attr('href'), page).href === peer), page);
    assert.equal($('meta[property="og:url"]').attr('content'), page);
    for (const prop of ['og:title', 'og:description', 'og:image']) assert.ok($('meta[property="' + prop + '"]').attr('content'), prop);
    assert.ok($('meta[name="twitter:card"]').attr('content'));
    assert.ok($('meta[name="twitter:image"]').attr('content'));
    for (const property of ['property="og:image"', 'name="twitter:image"']) {
      const image = new URL($('meta[' + property + ']').attr('content'));
      assert.ok(image.href.startsWith(base.href) && existsSync(join('dist', image.pathname.slice(base.pathname.length))), image.href);
    }
  }
});

test('all internal links, fragments and page assets resolve under the Pages subpath', () => {
  for (const [page, $] of published) {
    for (const el of $('a[href], img[src], script[src], link[rel="stylesheet"][href]').toArray()) {
      const href = $(el).attr('href') ?? $(el).attr('src');
      const url = new URL(href, page);
      if (url.origin !== base.origin) continue;
      if (/^https:\/\/mitojs\.github\.io\/(react-sdk-demo|vue[23]-sdk-demo|mito-admin-demo)\//.test(href)) continue;
      assert.ok(url.pathname.startsWith(base.pathname), page + ' → ' + href);
      const relative = decodeURIComponent(url.pathname.slice(base.pathname.length));
      const file = join('dist', relative, url.pathname.endsWith('/') ? 'index.html' : '');
      assert.ok(existsSync(file), page + ' → ' + href);
      const doc = published.get(url.origin + url.pathname);
      if (doc && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(doc('[id]').toArray().some((e) => e.attribs.id === id), page + ' → ' + href);
      }
    }
  }
});

test('the sitemap contains only canonical articles in both languages', () => {
  const index = load(readFileSync('dist/sitemap-index.xml'), { xml: true });
  const maps = index('sitemap loc').map((_, el) => index(el).text()).get();
  const urls = maps.flatMap((url) => {
    assert.ok(url.startsWith(base.href), url);
    const $ = load(readFileSync(join('dist', new URL(url).pathname.slice(base.pathname.length))), { xml: true });
    return $('url > loc').map((_, el) => $(el).text()).get();
  });
  assert.deepEqual(urls.sort(), [...published.keys()].sort());
  const indexData = JSON.parse(readFileSync('dist/pagefind/pagefind-entry.json'));
  assert.ok(indexData.languages.en && Object.keys(indexData.languages).some((l) => l.startsWith('zh')), 'both search languages');
});

test('every historical route and heading has a static destination', () => {
  for (const path of Object.values(legacyRoutes)) {
    assert.ok(published.has(new URL(path.slice(1), base).href), path);
  }
  for (const [path, ids] of Object.entries(legacyHeadings)) {
    const $ = published.get(new URL(path + '/', base).href);
    const actual = $('[id]').map((_, node) => node.attribs.id).get();
    for (const id of ids) assert.equal(actual.filter((v) => v === id).length, 1, path + '#' + id);
  }
  for (const [path, target] of Object.entries(sectionRedirects)) {
    const $ = load(readFileSync(join('dist', path, 'index.html')));
    assert.equal($('meta[http-equiv="refresh"]').attr('content'), '0;url=' + base.pathname + target.slice(1));
  }
});
