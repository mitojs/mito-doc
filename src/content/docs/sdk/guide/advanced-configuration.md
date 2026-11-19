---
title: "Advanced configuration"
description: "Customize MitoJS trace headers, URL filters, event throttling and report destinations in the browser and Mini Program SDKs."
sidebar:
  label: "Advanced configuration"
---

<span class="legacy-anchor" id="advanced-configuration"></span>



**The following is base options, both of [@mitojs/browser](/mito-doc/sdk/guide/browser/) and [@mitojs/wx-mini](/mito-doc/sdk/guide/wx-mini/) can use 😎**

## advanced field


### enableTraceId?: boolean
default is closed,all page's http request will add a unique id in request header when set true


### includeHttpUrlTraceIdRegExp?: RegExp
Should config this field if you set `enableTraceId` true.Considering that random addition of redundant request headers maybe cause cross-domain error,so here is regular containing relationship.It will be included When `includeHttpUrlTraceIdRegExp.test(xhr.url)` is `true`


### traceIdFieldName?: string
When set `enableTraceId` true,traceId will be added in request header, defaul value is `Trace-Id`.You can configure this field to appoint name


### filterXhrUrlRegExp?: RegExp
default value is null,mean all ajax request will be monitored.You can set some value to filter url.It will filter when `filterXhrUrlRegExp.test(xhr.url) === true`


### throttleDelayTime?: number
defaul value is 0,it mean throttle delay time of collect button click event and weixin touch event

## advanced hooks


  ```js
  /**
   *
   * 钩子函数，每次发送前都会调用
   * @param {TransportDataType} event 上报的数据格式
   * @param {string} url 上报到服务端的地址
   * @return {*}  {string} 返回空时不上报
   * @memberof BaseOptionsHooksType
   */
  ```
### configReportUrl?(event: TransportDataType, url: string): string

****

**示例**：上报时可在url后面追加时间戳字段time

```js
MITO.init({
  ...
  async configReportXhr(event, url){
    return `${url}?time=${Date.now()}`
	}
})
```


---------------------



  ```js
  /**
   *钩子函数:在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   *trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   *
   * @return {*}  {(string | number)}
   * @memberof BaseOptionsHooksType
   */
  ```
### backTrackerId?(): string | number
**示例**：trackerId表示用户唯一键（可以理解成userId），可以用uuid生成或用直接用userId，为了方便区分每个错误的用户数，会放入`authInfo`对象中

```typescript
MITO.init({
  ...
  backTrackerId(){
  	// 比如userId在localStorage中
  	return localStorage.getItem('userId')
	}
})
```
