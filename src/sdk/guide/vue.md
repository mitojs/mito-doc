---
title: @mitojs/vue
order: 6
toC: menu
nav:
  title: SDK
  order: 1
---

# @mitojs/vue

# ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@mitojs/browser` to `@miotjs/wx-mini`**



# 🛠️ Install

```bash
# using npm
npm i @mitojs/vue @mitojs/browser
# using yarn
yarn add @mitojs/vue @mitojs/browser
```



# 🥳 Usage

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
