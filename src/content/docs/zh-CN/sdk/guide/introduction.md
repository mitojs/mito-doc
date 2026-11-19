---
title: "什么是 MITO ？"
description: "了解 MitoJS 采集的错误与用户行为、支持的平台，以及 React、Vue 和监控后台的在线演示。"
sidebar:
  label: "项目介绍"
---

> 旧版指南保留了早期 SDK 的接入方式。v4 需要支持 ES2015 的运行环境，并已结束对 Internet Explorer 的支持。 [查看 v4 快速入门](/mito-doc/zh-CN/sdk/guide/quickstart-v4/)

<span class="legacy-anchor" id="什么是-mito-"></span>



MITO，读音[miːtəʊ],是**monitor**的缩写，是一款Web和微信小程序轻量级的前端监控SDK

## 快速开始

### 🛠️ Install
```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```

### 🥳 Usage
```typescript
import { init } from '@mitojs/browser'

const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

## 🤔 它能做些什么？

### 错误信息收集

可收集以下错误信息：

* 代码错误
* [unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)
* 资源错误
* http请求错误
* 路由切换错误

### 用户行为收集

可收集以下用户行为：

* click事件、wx.tap
* http 请求
* console
* 路由切换

### 支持的平台

* web（>= IE8） [@mitojs/browser](/mito-doc/zh-CN/sdk/guide/browser/)
* Vue2、Vue3 [@mitojs/vue](/mito-doc/zh-CN/sdk/guide/vue/)
* React(>=16.x) [@mitojs/react](/mito-doc/zh-CN/sdk/guide/react/)
* 微信小程序 [@mitojs/wx-mini](/mito-doc/zh-CN/sdk/guide/wx-mini/)

### Demo:体验SDK收集数据

* [react-sdk-demo](https://mitojs.github.io/react-sdk-demo/):Use @mitojs/react  in react@next

* [vue3-sdk-demo](https://mitojs.github.io/vue3-sdk-demo/):Use @mitojs/vue in Vue3.x

* [vue2-sdk-demo](https://mitojs.github.io/vue2-sdk-demo/):Use @mitojs/vue in Vue2.x

### 小程序埋点自研

由于埋点过于业务性，所以该SDK只提供一些关于微信小程序的`hooks`和上报方法，不过可以利用这些`hooks`来个性化定制埋点上报，[具体详情](/mito-doc/zh-CN/sdk/guide/wxtrack/)


## 😃 监控平台(监控平台的Demo)



[vue-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info): show a HTTP_ERROR in vue platform

[react-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info): show a JAVASCRIPT_ERROR in react platform

[js-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info):show JAVASCRIPT_ERROR in js platform

[wx-mini-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info):show JAVASCRIPT_ERROR in wx-mini platform
