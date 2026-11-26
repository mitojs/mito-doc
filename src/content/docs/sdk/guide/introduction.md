---
title: "What's MITO?"
description: "An introduction to the MitoJS monitoring SDK, the events it captures, supported platforms and four live monitoring demos."
sidebar:
  label: "Introduction"
---

> This guide preserves integration examples from earlier SDK releases. Version 4 requires an ES2015-capable runtime and drops Internet Explorer support. [Open the v4 quickstart](/mito-doc/sdk/guide/quickstart-v4/)

<span class="legacy-anchor" id="whats-mito"></span>



MITO,pronounced like [miːtəʊ],it's the abbreviation of `monitor` that is a lightweight SDK for monitor web and weixin miniprograme

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

* web（>= IE8） [@mitojs/browser](/mito-doc/sdk/guide/browser/)
* Vue2、Vue3 [@mitojs/vue](/mito-doc/sdk/guide/vue/)
* React(>=16.x) [@mitojs/react](/mito-doc/sdk/guide/react/)
* weixin miniprograme [@mitojs/wx-mini](/mito-doc/sdk/guide/wx-mini/)

### Demo:experience the SDK to collect data

[React 19: error boundaries and request tracing](https://mitojs.github.io/react-sdk-demo/) · [Vue 3: component errors and report inspector](https://mitojs.github.io/vue3-sdk-demo/) · [Vue 2: error monitoring and HTTP requests](https://mitojs.github.io/vue2-sdk-demo/). All three demos receive real SDK-generated test reports locally in the browser.

### DIY your weixin miniprograme track SDK

[@mitojs/wx-mini](/mito-doc/sdk/guide/wx-mini/) just provider some hooks and report method because of the track is too business。However,you can DIY track SDK for yourself with those hooks.

## 😃 monitoring platform(mito admin with mock data)



[Open the mock monitoring dashboard](https://mitojs.github.io/mito-admin-demo/) to inspect sample records. They are simulated reports, not live SDK uploads or production data.

[vue-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info): show a HTTP_ERROR in vue platform

[react-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info): show a JAVASCRIPT_ERROR in react platform

[js-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info):show JAVASCRIPT_ERROR in js platform

[wx-mini-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info):show JAVASCRIPT_ERROR in wx-mini platform
