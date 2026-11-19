---
title: "WeChat Mini Program SDK"
description: "Install the Mini Program SDK, configure silent options, and use request, page, share and navigation hooks with native apps, uni-app or Remax."
sidebar:
  label: "WeChat Mini Programs"
---

## Install

```bash
# Using npm
npm i @mitojs/wx-mini
# Using Yarn
yarn add @mitojs/wx-mini
```

### Initialize the SDK

```typescript
// main.js
import { init } from '@mitojs/wx-mini'

// Multiple SDK instances
const MitoInstance = init({
  // Enable debug during development; set it to false in production.
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
    // Configure the request headers for reports.
  configReportWxRequest(data) {
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  },
})
```

## Use a local file

For a native WeChat Mini Program, download the [SDK bundle](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js) as a JavaScript file, then import it in `app.js` as shown below.

![The local SDK file imported in a WeChat Mini Program](/mito-doc/media/wx-mini-local-file.jpg)

## uni-app (Vue)

The SDK also works with Vue-based frameworks such as uni-app.

### Install the packages

```bash
npm i @mitojs/wx-mini @mitojs/vue
```

### Register the Vue plugin

```typescript
import { init } from '@mitojs/wx-mini'
import { vuePlugin } from '@mitojs/vue'
import Vue from 'vue'
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
  // Configure the request headers for reports.
  configReportWxRequest(data) {
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  },
  vue:Vue
},[vuePlugin])
```

See the [Vue integration guide](/mito-doc/sdk/guide/vue/) for more examples.

## Remax (React)

### Install the packages

```bash
npm i @mitojs/wx-mini @mitojs/react
```

See the [React integration guide](/mito-doc/sdk/guide/react/) for more examples.

## Options

These options and hooks are specific to `@mitojs/wx-mini`. The [basic configuration](/mito-doc/sdk/guide/basic-configuration/) applies to both Mini Programs and the browser SDK.

## WxSilentOptionsType

| Option | Type | Default | Effect when enabled |
| --- | --- | --- | --- |
| `silentRequest` | `boolean` | `false` | Stops monitoring requests and downloads made by the Mini Program. |
| `silentConsole` | `boolean` | `false` | Disables console monitoring. The SDK wraps the native console. The original guide recommends enabling this option during testing and leaving it off in production. |
| `silentDom` | `boolean` | `false` | Stops recording tap and touch events. By default, elements with an ID or class can appear in the breadcrumb trail. |
| `silentRoute` | `boolean` | `false` | Stops monitoring page navigation. |
| `silentAppOnError` | `boolean` | `false` | Stops collecting `App.onError` events. |
| `silentAppOnUnhandledRejection` | `boolean` | `false` | Stops collecting `App.onUnhandledRejection` events. |
| `silentPageOnShareAppMessage` | `boolean` | `false` | Stops monitoring page shares. The default enables the page share feature. |
| `silentPageOnShareTimeline` | `boolean` | `false` | Stops monitoring shares to the timeline. The default enables the page share feature. |

## WxHookOptionsType

### `configReportWxRequest(event: TransportDataType | any): Partial<WechatMiniprogram.RequestOption>`

  ```js
  /**
   * Configure wx.request when a Mini Program sends a report.
   *
   * @param {(TransportDataType | any)} event Data about to be reported.
   * @return {*}  {Partial<WechatMiniprogram.RequestOption>}
   * @memberof WxHookOptionsType
   */
  ```

Set the Content-Type header on the outgoing report.

```js
MITO.init({
  ...
  configReportWxRequest(event){
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  }
})
```

### `appOnLaunch(options: WechatMiniprogram.App.LaunchShowOption): void`

  ```js
  /**
   * Runs after the native App.onLaunch callback.
   *
   * @param {WechatMiniprogram.App.LaunchShowOption} options
   * @memberof WxHookOptionsType
   */
  ```

Log the arguments received at application launch.

```js
MITO.init({
  ...
  appOnLaunch(options){
    console.log('mito appOnLaunch', options)
  }
})
```

### `appOnShow(options: WechatMiniprogram.App.LaunchShowOption): void`

  ```js
  /**
   * Runs after the native App.onShow callback.
   *
   * @param {WechatMiniprogram.App.LaunchShowOption} options
   * @memberof WxHookOptionsType
   */
  ```

Inspect the options passed when the application becomes visible.

```js
MITO.init({
  ...
  appOnShow(options){
    console.log('mito appOnShow', options)
  }
})
```

### `appOnHide(): void`

  ```js
  /**
   * Runs after the native App.onHide callback.
   *
   * @memberof WxHookOptionsType
   */
  ```

Log when the application is hidden.

```js
MITO.init({
  ...
  appOnHide(){
    console.log('mito appOnHide', options)
  }
})
```

### `appOnPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void`

  ```js
  /**
   * Runs after the native onPageNotFound callback.
   *
   * @param {WechatMiniprogram.OnPageNotFoundCallbackResult} data
   * @memberof WxHookOptionsType
   */
  ```

Inspect the missing-page event.

```js
MITO.init({
  ...
  appOnPageNotFound(data){
    console.log('mito appOnPageNotFound', data)
  }
})
```

### `pageOnLoad(page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native page load callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Inspect the page instance on load.

```js
MITO.init({
  ...
  pageOnLoad(page){
    console.log('mito pageOnLoad', page)
  }
})
```

### `pageOnShow(page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native Page.onShow callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Log the page instance when it becomes visible.

```js
MITO.init({
  ...
  pageOnShow(page){
    console.log('mito pageOnShow', page)
  }
})
```

### `pageOnReady(page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native page ready callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Inspect the page instance when it becomes ready.

```js
MITO.init({
  ...
  pageOnReady(page){
    console.log('mito pageOnReady', page)
  }
})
```

### `pageOnUnload(page: IWxPageInstance): void`

  ```js
  /**
   *  Runs after the native page unload callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Log the page being unloaded.

```js
MITO.init({
  ...
  pageOnUnload(page){
    console.log('mito pageOnUnload', page)
  }
})
```

### `pageOnHide(page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native Page.onHide callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Inspect the page being hidden.

```js
MITO.init({
  ...
  pageOnHide(page){
    console.log('mito pageOnHide', page)
  }
})
```

### `pageOnShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption,page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native page share callback.
   *
   * @param {(WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```

Inspect the share options and the current page.

```js
MITO.init({
  ...
  pageOnShareAppMessage(options, page){
    console.log('mito pageOnShareAppMessage', options)
  }
})
```

### `pageOnShareTimeline(options: WechatMiniprogram.Page.IShareAppMessageOption, page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native Page.onShareTimeline callback.
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```

Log the options and page for a timeline share.

```js
MITO.init({
  ...
  pageOnShareTimeline(options, page){
    console.log('mito pageOnShareTimeline', options, page)
  }
})
```

### `pageOnTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption,page: IWxPageInstance): void`

  ```js
  /**
   * Runs before the native Page.onTabItemTap callback.
   *
   * @param {(WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```

Inspect the tab item and the page receiving the tap.

```js
MITO.init({
  ...
  pageOnTabItemTap(options){
    console.log('mito pageOnTabItemTap', options)
  }
})
```

### `wxNavigateToMiniProgram(options: WechatMiniprogram.NavigateToMiniProgramOption): WechatMiniprogram.NavigateToMiniProgramOption`

  ```js
  /**
   * Wraps navigation to another Mini Program so you can change the query and extraData.
   *
   * @param {WechatMiniprogram.NavigateToMiniProgramOption} options
   * @return {*}  {WechatMiniprogram.NavigateToMiniProgramOption}
   * @memberof WxHookOptionsType
   */
  ```

Modify navigation options before opening another Mini Program. The example adds a timestamp to the query.

```js
MITO.init({
  ...
  wxNavigateToMiniProgram(options){
    options.path = `${options.path}?time=${Date.now()}`
    return options
  }
})
```

### `triggerWxEvent(e: WechatMiniprogram.BaseEvent): void`

  ```js
  /**
   * Wraps action handlers and passes their first argument to this hook.
   *
   * Check e.type to identify a tap.
   *
   * @param {WechatMiniprogram.BaseEvent} e The event passed to the handler.
   * @memberof WxHookOptionsType
   */
  ```

Inspect a tap and read its currentTarget.

```js
MITO.init({
  ...
  triggerWxEvent(e){
    // You can also check for touchmove and other events.
    if (e.type === 'tap'){
      // Read the tapped target and its dataset, including any class or ID recorded there.
      console.log(e.currentTarget)
    }
  }
})
```
