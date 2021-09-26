---
title: base options
order: 2
toC: menu
nav:
  title: SDK
  order: 1
---

# base options

**The following is base options, both [@mitojs/browser](./browser) and [@mitojs/wx-mini](./wx-mini.md) can use 😎**
## BaseOptionsFieldsType


report to server's url
### dsn?: string

default is closed,sdk all functions will be turned off when set ture
### disabled?: boolean

default is ''(empty string),it mean that every project has a unique key
### apikey?: string

default is closed,it will be print in Console when set true
### debug?: boolean

default is closed,all page's http request will add a unique id in request header
### enableTraceId?: boolean

Should config this field if you set `enableTraceId` true.Considering that random addition of redundant request headers maybe cause cross-domain error,so here is regular containing relationship.It will be included When `includeHttpUrlTraceIdRegExp.test(xhr.url)` is `true`
### includeHttpUrlTraceIdRegExp?: RegExp

When set `enableTraceId` true,traceId will be added in request header, defaul value is `Trace-Id`.You can configure this field to appoint name
### traceIdFieldName?: string


default value is null,mean all ajax http will be monitored.You can set some value to filter url.It will filter when `filterXhrUrlRegExp.test(xhr.url) === true`
### filterXhrUrlRegExp?: RegExp

defaul value is 20,it will be 100 if value more than 100.it mean breadcrumb stack length
### maxBreadcrumbs?: number

defaul value is 0,it mean throttle delay time of button click event and weixin touch event
### throttleDelayTime?: number

default value is 2,it mean max report count of the same error
### maxDuplicateCount?: number

vue's root Instance
### vue?: VueInstance



## BaseOptionsHooksType


```js
  /**
   * 钩子函数:在每次发送事件前会调用
   *
   * @param {TransportDataType} event 上报的数据格式
   * @return {*}  {(Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null)} 如果返回 null | undefined | boolean 时，将忽略本次上传
   * @memberof BaseOptionsHooksType
   */
```
### beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null

**示例**：如果错误事件发生在`test.com/test`地址下则不上报服务端

```js
MITO.init({
  ...
  async beforeDataReport(event){
  	if (event.data.url === 'test.com/test') return false
    return event
	}
})
```



------------------------



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
   * 钩子函数:在每次添加用户行为事件前都会调用
   *
   * @param {Breadcrumb} breadcrumb Breadcrumb的实例
   * @param {BreadcrumbPushData} hint 单次推入用户行为栈的数据
   * @return {*}  {(BreadcrumbPushData | CANCEL)} 如果返回 null | undefined | boolean 时，将忽略本次的push
   * @memberof BaseOptionsHooksType
   */
  ```
### beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL

**示例**：如果`type`是`Console`的就过滤，不会`push`到当前用户行为栈中

```typescript
MITO.init({
  ...
  beforePushBreadcrumb(breadcrumb, hint){
  	console.log(breadcrumb, hint)
  	if (hint.type === 'Console') return false
		return hint
	}
})
```



--------------



  ```js
  /**
   * 钩子函数:拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   *
   * @param {IRequestHeaderConfig} config 原本的请求头信息
   * @param {IBeforeAppAjaxSendConfig} setRequestHeader 设置请求头函数
   * @memberof BaseOptionsHooksType
   */
  ```
### beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void

**示例**：拦截用户页面的ajax请求，并在ajax请求发送前执行该hook。在页面所有ajax请求时添加请求头，类似`axios`的request拦截器，

```typescript
MITO.init({
  ...
  beforeAppAjaxSend({method, url}, config){
  	if (method === 'GET') {
  		config.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
  	}
	}
})
```



----------



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


## manual reporting
you can call `log` function in anywhere with mito instance

```js
interface LogTypes {
  message?: string | number | Object
  tag?: string;
  level?: Severity;
  ex?: any;
}
MitoInstance.log(LogTypes)
```

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```


Sometime we need to report business information or track information in business code,then we can use `MitoInstance.log`.The following example is that report abnormal information if the http interface is abnoraml
```js
$api.getPayStatus().then(res => {
  if (res.success) {
    // http status normal
  } else {
    // abnormal report information
    MitoInstance.log({
      // error message
      message: res.errMsg,
      // optional,can understand as category
      tag: 'payPage'
      // optional,default is Severity.Critical
      // level: '',
      // optional,Error Object
      // ex: ''
    })
  }
})
```

It's also can statistical PV and UV of uses of each function.Such as the following example is track in ActivePage function,UV statistics need to rely on `trackerId`[trackerId configuration](#backtrackerid-string--number)
```js
/**
 * react hook component:ActivePage
 */
function ActivePage() {
  useEffect(() => {
    MitoInstance.log({
      // optional
      tag: 'ActivePage'
    })
  }, [])
  return <div>This Is ActivePage</div>
}
```


### generate errorId
errorId source code [click here](https://github.com/mitojs/mitojs/blob/master/packages/utils/src/errorId.ts)

It's generated according to the passed `tag` key,so will generate the same errorId when passed the same `tag` plus different `message`.Such as the follow:

```js
MitoInstance.log({
  message: 'test_1',
  tag: 'ActivePageStatistics'
})
```

```js
MitoInstance.log({
  message: 'test_2',
  tag: 'ActivePageStatistics'
})
```
The two example will generated the same errorId.But if the `tag` key changed,it will be different
