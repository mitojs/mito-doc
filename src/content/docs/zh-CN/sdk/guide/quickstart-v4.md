---
title: "用 MitoJS v4 上报第一个错误"
description: "在本机安装 @mitojs/browser 4.0.0，触发一次浏览器异常，并在同源测试接收端确认 JSON 上报。"
sidebar:
  label: "v4 快速入门"
---

这个示例在你自己的电脑上运行，需要 Node.js 和支持 ES2015 的现代浏览器。点击按钮触发一个未捕获异常后，你可以在终端看到测试接收端收到的报告。

## 安装已发布的 SDK

在一个新目录中安装本指南使用的版本。

```bash
npm init -y
npm install @mitojs/browser@4.0.0
```

## 配置浏览器

将以下内容保存为 `index.html`。页面使用刚安装的 SDK，`dsn` 指向本地服务器接收上报的同源地址 `/reports`。

```html title="index.html"
<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>MitoJS v4</title>
<button id="report">触发测试错误</button>
<script src="/browser.js"></script>
<script>
  MITO.init({ dsn: '/reports', maxBreadcrumbs: 10 });
  document.querySelector('#report').addEventListener('click', () => {
    throw new Error('MitoJS v4 quickstart');
  });
</script>
</html>
```

## 启动本地接收端

在 `index.html` 旁新建 `receiver.mjs`。它提供示例页面，并打印每份报告的 SDK 版本、事件类型和消息。

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

## 确认收到上报

打开 `http://127.0.0.1:4178/` 并点击 **触发测试错误**。浏览器的网络面板会出现返回 `204` 的 `POST /reports`，接收端会在终端打印下面这行。

```text
4.0.0 JAVASCRIPT MitoJS v4 quickstart
```

在使用构建工具的应用里，从 `@mitojs/browser` 导入 `init`，在应用入口调用一次，并把 `dsn` 设置为自己的监控接收地址。

```js
import { init } from '@mitojs/browser';

init({ dsn: '/reports', maxBreadcrumbs: 10 });
```

## 体验在线 Demo

- [React](https://mitojs.github.io/react-sdk-demo/)
- [Vue 2](https://mitojs.github.io/vue2-sdk-demo/)
- [Vue 3](https://mitojs.github.io/vue3-sdk-demo/)
- [监控后台与错误详情](https://mitojs.github.io/mito-admin-demo/#/errors/1/info)

[查看 v4 发布说明](https://github.com/mitojs/mitojs/releases/tag/%40mitojs%2Fweb%404.0.0)。
