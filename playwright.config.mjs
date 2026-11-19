import { defineConfig, devices } from '@playwright/test';

const local = 'http://127.0.0.1:43172/mito-doc/';
const baseURL = process.env.DOCS_BASE_URL || local;

export default defineConfig({
  testDir: 'tests',
  testMatch: 'browser.spec.mjs',
  workers: 2,
  timeout: 90_000,
  expect: { timeout: 12_000 },
  use: { baseURL, channel: process.env.PLAYWRIGHT_CHANNEL, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.DOCS_BASE_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1 --port 43172 --ignore-lock',
    url: local,
    reuseExistingServer: !process.env.CI,
  },
});
