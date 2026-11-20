---
title: "Report your first error with MitoJS v4"
description: "Run @mitojs/browser 4.0.0 locally, trigger an uncaught browser error and read its JSON report at a same-origin test endpoint."
sidebar:
  label: "v4 quickstart"
---

This example runs on your own computer with Node.js and a modern browser. The browser SDK requires an ES2015-capable runtime. The test receiver prints one uncaught error to your terminal.

## Install the published SDK

In a new directory, install the exact release used in this guide.

```bash
npm init -y
npm install @mitojs/browser@4.0.0
```

## Configure the browser

Save the following as `index.html`. The SDK loads from the installed package. The `dsn` points to the same-origin `/reports` endpoint that the local server will receive.

```html title="index.html"
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>MitoJS v4</title>
<button id="report">Trigger a test error</button>
<script src="/browser.js"></script>
<script>
  MITO.init({ dsn: '/reports', maxBreadcrumbs: 10 });
  document.querySelector('#report').addEventListener('click', () => {
    throw new Error('MitoJS v4 quickstart');
  });
</script>
</html>
```

## Run a local receiver

Save this as `receiver.mjs` next to `index.html`. It serves the example and prints the SDK version, event type and message for each report.

```js title="receiver.mjs"
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sdk = require.resolve('@mitojs/browser/dist/browser.min.js');
const index = new URL('index.html', import.meta.url);
const port = Number(process.env.PORT || 4178);

const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/reports') {
    try {
      let body = '';
      for await (const chunk of req) body += chunk;
      const { authInfo, data } = JSON.parse(body);
      console.log(authInfo.sdkVersion, data.type, data.message);
      res.writeHead(204).end();
    } catch {
      res.writeHead(400).end();
    }
    return;
  }
  const files = new Map([
    ['/', [index, 'text/html; charset=utf-8']],
    ['/browser.js', [sdk, 'text/javascript; charset=utf-8']],
  ]);
  const file = files.get(req.url);
  if (req.method !== 'GET' || !file) {
    res.writeHead(404).end();
    return;
  }
  try {
    const body = await readFile(file[0]);
    res.writeHead(200, { 'Content-Type': file[1] }).end(body);
  } catch {
    res.writeHead(500).end();
  }
});
server.listen(port, '127.0.0.1', () => console.log('http://127.0.0.1:' + server.address().port));
```

```bash
node receiver.mjs
```

## Confirm the report

Open `http://127.0.0.1:4178/` and click **Trigger a test error**. In the browser’s Network panel, `POST /reports` returns `204`. The receiver prints the following line.

```text
4.0.0 JAVASCRIPT MitoJS v4 quickstart
```

In an application with a bundler, import `init` from `@mitojs/browser` and call it once in the application entry point. Set `dsn` to your own monitoring endpoint.

```js
import { init } from '@mitojs/browser';

init({ dsn: '/reports', maxBreadcrumbs: 10 });
```

## Explore the live demos

- [React](https://mitojs.github.io/react-sdk-demo/)
- [Vue 2](https://mitojs.github.io/vue2-sdk-demo/)
- [Vue 3](https://mitojs.github.io/vue3-sdk-demo/)
- [Monitoring dashboard and error details](https://mitojs.github.io/mito-admin-demo/#/errors/1/info)

[Read the v4 release notes](https://github.com/mitojs/mitojs/releases/tag/%40mitojs%2Fweb%404.0.0).
