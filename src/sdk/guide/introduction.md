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

## 🥳 Feature

✔️ 🔨 monitor Xhr、Fetch、wx.request

✔️ 🔨 monitor console、wx.console

✔️ 🔨 monitor route change(hashroute、browser route、wx route)

✔️ 🔨 monitor code error、resource load error

✔️ 🔨 monitor click、wx:tab、wx:touchmove

✔️ 👌 rich hooks and options

✔️ 👌 perfect test for web unit test、web e2e、wxmini e2e

✔️ 👌 support web（>= IE8） [@mitojs/browser](https://github.com/mitojs/mitojs/tree/master/packages/browser)

✔️ 👌 support framework with Vue3、Vue2.6[@mitojs/vue](https://github.com/mitojs/mitojs/tree/master/packages/vue)、React@latest[@mitojs/react](https://github.com/mitojs/mitojs/tree/master/packages/react)

✔️ 👌 support native wxmini、uni-app、remax framework etc [@mitojs/wx-mini](https://github.com/mitojs/mitojs/tree/master/packages/wx-mini)

✔️ 🔥 keep iterating~

## quick start

### browser
#### 🛠️ Install
```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```

#### 🥳 Usage
```typescript
import { init } from '@mitojs/browser'

const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```



