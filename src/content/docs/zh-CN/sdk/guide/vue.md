---
title: "@mitojs/vue"
description: "了解如何在 Vue 2 和 Vue 3 中注册 MitoJS Vue 插件并采集框架异常。"
sidebar:
  label: "Vue"
---

> 旧版指南保留了早期 SDK 的接入方式。v4 需要支持 ES2015 的运行环境，并已结束对 Internet Explorer 的支持。 [查看 v4 快速入门](/mito-doc/zh-CN/sdk/guide/quickstart-v4/)

<span class="legacy-anchor" id="mitojsvue"></span>



## Vue 2 和 Vue 3 在线演示

- [Vue 2 错误监控和请求追踪](https://mitojs.github.io/vue2-sdk-demo/)：将 Vue 构造器传给 SDK，查看 HTTP 500 和行为轨迹。
- [Vue 3 错误监控和上报观察窗](https://mitojs.github.io/vue3-sdk-demo/)：将 createApp() 返回的实例传给 SDK，触发组件事件错误并展开上报 JSON。

两套示例都使用 MitoJS 4.0.0；上报在当前浏览器接收，不发送给生产监控。

## ⚠️ 注意

**如果你想要在微信小程序里面引入，请把 `@mitojs/browser` 替换成 `@miotjs/wx-mini`**

## 🛠️ Install

```bash
# using npm
npm i @mitojs/vue @mitojs/browser
# using yarn
yarn add @mitojs/vue @mitojs/browser
```



## 🥳 Usage

### Vue2.X

```typescript
// main.js
import Vue from 'vue'
import { init } from '@mitojs/browser'
import { vuePlugin } from '@mitojs/vue'

// multiple instances
const MitoInstance = init({
  vue: Vue,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])

```

### Vue3.x
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { init } from "@mitojs/browser";
import { vuePlugin } from "@mitojs/vue";

const app = createApp(App)
const MitoInstance = init({
  vue: app,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])
```

<span class="legacy-anchor" id="使用cdn方式"></span>

## 使用CDN方式 <strong>不推荐</strong>

不推荐使用CDN方式，因为`@mitojs/web`的`cjs`文件包含了`jsxRuntime`代码，所以这个包的大小会比其他的包大很多。

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
</header>
```

当你在`index.html`使用了CDN方式，将会有一个`MITO`的全局变量会被挂载到`window`上。然后你就可以在组件中使用它

**index.js**

```jsx | pure
import Vue from 'vue'
const MitoInstance = MITO.init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
  vue:Vue
},[MITO.vuePlugin])
```
