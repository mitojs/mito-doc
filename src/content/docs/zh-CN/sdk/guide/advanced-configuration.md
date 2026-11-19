---
title: "高级配置"
description: "通过 MitoJS 的配置与钩子自定义链路追踪请求头、URL 过滤、节流时间和上报地址。"
sidebar:
  label: "高级配置"
---

<span class="legacy-anchor" id="高级配置"></span>



**以下是高级配置,[@mitojs/browser](/mito-doc/zh-CN/sdk/guide/browser/) 和 [@mitojs/wx-mini](/mito-doc/zh-CN/sdk/guide/wx-mini/) 都可以传入使用 😎**

## 属性


### enableTraceId?: boolean
默认是关闭，为true时，所有页面的http请求都在请求头中添加一个唯一键

Should config this field if you set `enableTraceId` true.Considering that random addition of redundant request headers maybe cause cross-domain error,so here is regular containing relationship.It will be included When `includeHttpUrlTraceIdRegExp.test(xhr.url)` is `true`
### includeHttpUrlTraceIdRegExp?: RegExp
当你设置`enableTraceId`为`true`时，应该配置当前属性。考虑到随便在请求头中添加属性会导致跨域错误，所以这边的正则配置是包含关系。当`includeHttpUrlTraceIdRegExp.test(xhr.url)`为`true`时这个`xhr.url`的请求头才会被添加`Trace-Id`


### traceIdFieldName?: string
当你设置`enableTraceId:true`，`traceId`将会在请求头中被添加，默认key是`Trace-Id`。你可以通过配置当前属性来指定名称


### filterXhrUrlRegExp?: RegExp
默认值是null，表示所有ajax请求都将被监听。你可以设置当前值来过滤哪些你不想监听的url。过滤规则是`filterXhrUrlRegExp.test(xhr.url) === true`时，会被过滤掉



### throttleDelayTime?: number
默认值为0，表示收集按钮点击事件和微信小程序touch事件的节流时间

## 钩子函数


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
