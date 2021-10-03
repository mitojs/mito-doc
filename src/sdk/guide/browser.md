---
title: @mitojs/browser
order: 4
toC: menu
nav:
  title: SDK
  order: 1
---

# @mitojs/browser

## Install

```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```


### usage

```typescript
// some.js
import { init } from '@mitojs/browser'

// multiple instances
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```



## Using With CDN
**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/browser/dist/browser.min.js"></script>
  <script>
    const MitoInstance = MITO.init({
      dsn: 'http://test.com/yourServer',
    });
  </script>
</header>
```


## opitons

## browser fields

|              Name              | Type      | Default    | Description                                                  |
| :----------------------------: | --------- | ---------- | ------------------------------------------------------------ |
| `useImgUpload` | `boolean` | `false` | Default value is false.Report by img way when set true.`data=encodeURIComponent(reportData)` will be appended after dsn.You need `decodeURIComponent` in server end. |
|          `silentXhr`           | `boolean` | `false`    | xhr will be monitored by defaut.Will not monitor when set true |
|         `silentFetch`          | `boolean` | `false`    | fetch will be monitored by defaut.Will not monitor when set true. |
|        `silentConsole`         | `boolean` | `false`    | console will be monitored by defaut.Will not monitor when set true. |
|          `silentDom`           | `boolean` | `false`    | click event will be monitored by defaut.When the label clicked by the user is not the body,it will be put into the breadcrumb stack .Will not monitor when set true. |
|        `silentHistory`         | `boolean` | `false`    | `popstate、pushState、replaceState` will be monitored by defaut.Will not monitor when set true. |
|         `silentError`          | `boolean` | `false`    | error will be monitored by defaut.Will not monitor when set true. |
|   `silentUnhandledrejection`   | `boolean` | `false`    | unhandledrejection will be monitored by defaut.Will not monitor when set true. |
|       `silentHashchange`       | `boolean` | `false`    | Hashchange will be monitored by defaut.Will not monitor when set true. |


### browser hooks

```js
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   *
   * @param {XMLHttpRequest} xhr XMLHttpRequest的实例
   * @param {*} reportData 上报的数据
   * @memberof BrowserOptionsHooksType
   */
```
### configReportXhr?(xhr: XMLHttpRequest, reportData: any): void

**示例：**设置上报时的请求头为`'mito-header':'test123'`
```js
MITO.init({
  ...
  configReportXhr(xhr, reportData) {
    xhr.setRequestHeader('mito-header', 'test123')
  }
})
```

