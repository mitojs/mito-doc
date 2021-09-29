---
title: 什么是 MITO ？
order: 1
toC: menu
nav:
  title: SDK
  order: 1
---

# 什么是 MITO ？

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
* [onhandlerejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)
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

* web（>= IE8） [@mitojs/browser](./browser.zh-CN.md)
* Vue2、Vue3 [@mitojs/vue](./vue.zh-CN.md)
* React(>=16.x) [@mitojs/react](./react.zh-CN.md)
* 微信小程序 [@mitojs/wx-mini](./wx-mini.md)

### Demo:体验SDK收集数据

* [react-sdk-demo](https://mitojs.github.io/react-sdk-demo):Use @mitojs/react  in react@next

* [vue3-sdk-demo](https://mitojs.github.io/vue3-sdk-demo):Use @mitojs/vue in Vue3.x

* [vue2-sdk-demo](https://mitojs.github.io/vue2-sdk-demo):Use @mitojs/vue in Vue2.x

### 小程序埋点自研

由于埋点过于业务性，所以该SDK只提供一些关于微信小程序的`hooks`和上报方法，不过可以利用这些`hooks`来个性化定制埋点上报，[具体详情](./wxtrack.md)


## 😃 监控平台(监控平台的Demo)

<!-- ![react-example](https://tva1.sinaimg.cn/large/008eGmZEly1gmxggqptzwg30u00hoe84.gif) -->

[vue-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info): show a HTTP_ERROR in vue platform

[react-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info): show a JAVASCRIPT_ERROR in react platform

[js-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info):show JAVASCRIPT_ERROR in js platform

[wx-mini-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info):show JAVASCRIPT_ERROR in wx-mini platform





