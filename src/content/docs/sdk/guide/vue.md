---
title: "@mitojs/vue"
description: "Connect MitoJS to Vue 2 or Vue 3 and register the Vue plugin to collect framework errors."
sidebar:
  label: "Vue"
---

> This guide preserves integration examples from earlier SDK releases. Version 4 requires an ES2015-capable runtime and drops Internet Explorer support. [Open the v4 quickstart](/mito-doc/sdk/guide/quickstart-v4/)

<span class="legacy-anchor" id="mitojsvue"></span>



## ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@mitojs/browser` to `@miotjs/wx-mini`**



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
