---
title: What's MITO?
order: 1
toC: menu
nav:
  title: SDK
  order: 1
---

# What's MITO?

MITO,pronounced like [miːtəʊ],it's the abbreviation of `monitor` that is a lite SDK for monitor web and weixin miniprograme

## quick start

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

## 🤔 what can it do?

### collecting error information

can collect the following error information:

* code error
* [onhandlerejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)
* resource loading error
* http request error
* route change error

### collecting user behavior

can collect the following user behavior

* click event、wx.tap、wx.touchmove
* http request
* console
* route change

### support platforms

* web（>= IE8） [@mitojs/browser](./browser.md)
* Vue2、Vue3 [@mitojs/vue](./vue.md)
* React(>=16.x) [@mitojs/react](./react.md)
* weixin miniprograme [@mitojs/wx-mini](./wx-mini.md)

### Demo:experience the SDK to collect data

* [react-sdk-demo](https://mitojs.github.io/react-sdk-demo):Use @mitojs/react  in react@next

* [vue3-sdk-demo](https://mitojs.github.io/vue3-sdk-demo):Use @mitojs/vue in Vue3.x

* [vue2-sdk-demo](https://mitojs.github.io/vue2-sdk-demo):Use @mitojs/vue in Vue2.x

### DIY your weixin miniprograme track SDK

[@mitojs/wx-mini] just provider some hooks and report method because of the track is too business。However,you can DIY track SDK for yourself with those hooks.

## 😃 monitoring platform(mito admin with mock data)

<!-- ![react-example](https://tva1.sinaimg.cn/large/008eGmZEly1gmxggqptzwg30u00hoe84.gif) -->

[vue-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info): show a HTTP_ERROR in vue platform

[react-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info): show a JAVASCRIPT_ERROR in react platform

[js-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info):show JAVASCRIPT_ERROR in js platform

[wx-mini-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info):show JAVASCRIPT_ERROR in wx-mini platform
