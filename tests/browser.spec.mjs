import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { legacyRoutes } from '../src/legacy-routes.mjs';

for (const [locale, query, topic] of [
  ['', 'maxBreadcrumbs', 'basic-configuration'],
  ['zh-CN/', '小程序埋点', 'wxtrack'],
]) {
  test('search the ' + (locale || 'English') + ' documentation', async ({ page }) => {
    await page.goto(locale || './');
    await page.locator('button[data-open-modal]').click();
    await page.locator('#starlight__search input').fill(query);
    const hit = page.locator('.pagefind-ui__result-link[href*="/mito-doc/' + locale + 'sdk/guide/' + topic + '/"]').first();
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page).toHaveURL(new RegExp('/mito-doc/' + locale + 'sdk/guide/' + topic + '/'));
    await expect(page.locator('main')).toHaveAttribute('lang', locale ? 'zh-CN' : 'en');
  });
}

test('switch languages on the same page and copy the install command', async ({ page, context, baseURL }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  await page.goto('sdk/guide/quickstart-v4/');
  if (!await page.locator('a.language-link:visible').count()) {
    await page.locator('button[popovertarget="starlight__sidebar"]').click();
  }
  await page.locator('a.language-link:visible').first().click();
  await expect(page).toHaveURL(/\/zh-CN\/sdk\/guide\/quickstart-v4\/$/);
  await expect(page.locator('h1')).toContainText('上报第一个错误');
  const block = page.locator('.expressive-code').first();
  await block.hover();
  await block.locator('button[data-code]').click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('npm install @mitojs/browser@4.0.0');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('legacy routes, including double-hash bookmarks, lead to the published content', async ({ page, baseURL }, info) => {
  const examples = [
    ['/sdk/guide/introduction', 'quick-start'],
    ['/zh-CN/sdk/guide/basic-configuration', 'dsn-string'],
    ['/sdk/guide/wxtrack', '手动埋点'],
    ['/sdk/guide/introduction', '-usage'],
  ];
  if (info.project.name === 'desktop') {
    examples.push(...Object.keys(legacyRoutes).map((route) => [route, '']));
  }
  for (const [route, id] of examples) {
    const hash = id ? '#' + encodeURIComponent(id) : '';
    await page.goto(new URL('#' + route + hash, baseURL).href);
    const target = new URL(legacyRoutes[route].slice(1) + hash, baseURL);
    await expect(page).toHaveURL(target.href);
    if (id) {
      await expect.poll(() => page.evaluate(() => document.querySelector(':target')?.id)).toBe(id);
    }
  }
});

test('read and navigate without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto('zh-CN/');
    await page.getByRole('link', { name: '浏览完整指南' }).click();
    await expect(page.getByRole('heading', { name: '快速开始', exact: true })).toBeVisible();
    await expect(page.locator('main pre').first()).toContainText('npm i @mitojs/browser');
  } finally {
    await context.close();
  }
});

test('run the exact published quickstart against a local HTTP receiver', async ({ page }, info) => {
  const zh = info.project.name === 'mobile';
  await page.goto((zh ? 'zh-CN/' : '') + 'sdk/guide/quickstart-v4/');
  const blocks = page.locator('.expressive-code');
  const code = async (lang) => {
    const button = blocks.filter({ has: page.locator('pre[data-language="' + lang + '"]') }).first().locator('[data-code]');
    return (await button.getAttribute('data-code')).replaceAll('\u007f', '\n');
  };
  const cwd = info.outputPath('quickstart');
  await mkdir(cwd, { recursive: true });
  await writeFile(join(cwd, 'index.html'), await code('html'));
  await writeFile(join(cwd, 'receiver.mjs'), await code('js'));
  const receiver = spawn(process.execPath, ['receiver.mjs'], { cwd, env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'inherit'] });
  const lines = createInterface({ input: receiver.stdout });
  try {
    const [url] = await once(lines, 'line');
    await page.goto(url);
    const received = once(lines, 'line');
    const response = page.waitForResponse((r) => r.url() === url + '/reports' && r.request().method() === 'POST');
    await page.getByRole('button').click();
    const report = await response;
    expect(report.status()).toBe(204);
    expect(report.request().postDataJSON()).toMatchObject({
      authInfo: { sdkVersion: '4.0.0' }, data: { type: 'JAVASCRIPT', message: 'MitoJS v4 quickstart' },
    });
    expect((await received)[0]).toBe('4.0.0 JAVASCRIPT MitoJS v4 quickstart');
  } finally {
    lines.close();
    receiver.kill();
  }
});
