---
title: 高级配置
order: 3
toC: menu
nav:
  title: SDK
  order: 1
---

# 高级配置

**The following is base options, both of [@mitojs/browser](./browser) and [@mitojs/wx-mini](./wx-mini.md) can use 😎**

## 属性

default is closed,all page's http request will add a unique id in request header
### enableTraceId?: boolean

Should config this field if you set `enableTraceId` true.Considering that random addition of redundant request headers maybe cause cross-domain error,so here is regular containing relationship.It will be included When `includeHttpUrlTraceIdRegExp.test(xhr.url)` is `true`
### includeHttpUrlTraceIdRegExp?: RegExp

When set `enableTraceId` true,traceId will be added in request header, defaul value is `Trace-Id`.You can configure this field to appoint name
### traceIdFieldName?: string


default value is null,mean all ajax http will be monitored.You can set some value to filter url.It will filter when `filterXhrUrlRegExp.test(xhr.url) === true`
### filterXhrUrlRegExp?: RegExp


defaul value is 0,it mean throttle delay time of button click event and weixin touch event
### throttleDelayTime?: number


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



