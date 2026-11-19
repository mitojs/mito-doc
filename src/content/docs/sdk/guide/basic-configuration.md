---
title: "Basic configuration"
description: "Configure the MitoJS endpoint, breadcrumbs, duplicate reporting, tracker ID and hooks shared by the browser and Mini Program SDKs."
sidebar:
  label: "Basic configuration"
---

<span class="legacy-anchor" id="basic-configuration"></span>



**The following is base options, both of [@mitojs/browser](/mito-doc/sdk/guide/browser/) and [@mitojs/wx-mini](/mito-doc/sdk/guide/wx-mini/) can use 😎**

## basic field

### dsn?: string
report to server's url

### disabled?: boolean
default is closed,sdk all functions will be turned off when set ture

### apikey?: string
default is ''(empty string),it mean that every project has a unique key

### debug?: boolean
default is closed,it will be print in Console when set true(recommending set true in the development)

### maxDuplicateCount?: number
default value is 2,it mean max report count of the same error

### maxBreadcrumbs?: number
defaul value is 20,it will be 100 if value more than 100.it mean breadcrumb stack length

### vue?: VueInstance
vue's root Instance.go to [@mitojs/vue usage](/mito-doc/sdk/guide/vue/)




## basic hooks


```js
  /**
   * 钩子函数:在每次发送事件前会调用
   *
   * @param {TransportDataType} event 上报的数据格式
   * @return {*}  {(Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null)} 如果返回 null | undefined | boolean 时，将忽略本次上传
   * @memberof BaseOptionsHooksType
   */
```
### `beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null`

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


## multiple instances
start with version `2.1.28`,`mitojs` changed to multiple instances.Configuration items and hooks are isolated under each instance.Property and data are also isolated under each instance.


```js
const MitoInstance = MITO.init({
  debug: true,
  maxBreadcrumbs: 100,
  dsn: 'http://www.test.com/upload',
})


const MitoInstance_two = MITO.init({
  debug: true,
  maxBreadcrumbs: 20,
  dsn: 'http://www.test.com/two/upload',
})
```

### MitoInstance.breadcrumb
* The storage class for the user behavior that allows you to retrieve information collectd by the SDK
```js
const breadcrumbStack = MitoInstance.breadcrumb.getStack()
```

* you can append data in breadcrumb stack
```js
interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadcrumbTypes
  data: any
  /**
   * 分为user action、debug、http、
   */
  category?: BREADCRUMBCATEGORYS
  time?: number
  level: Severity
}
MitoInstance.breadcrumb.push(data: BreadcrumbPushData)
```
Of cause you can not follow the declaration type to push.However,the same data structure is recommended for traversal.

* clear breadcrumb
`MitoInstance.breadcrumb.clear()`

### MitoInstance.getOptions()
This mehtod retrieves all configuration items that you currently pass in

### MitoInstance.transport
* you can directly call `send` method to upload the data <strong>not recommended</strong>

first param is the data what you want to report,second param is breadcrumb stack


`MitoInstance.transport.send(yourData, MitoInstance.breadcrumb.getStack())`


## manual reporting
you can call `log` function in anywhere with mito instance

```js
interface LogTypes {
  message?: string | number | Object
  tag?: string;
  level?: Severity;
  ex?: any;
}
import { init } from '@mitojs/browser'
const MitoInstance = init({
  dsn: 'https://test.com/upload'
})
MitoInstance.log(LogTypes)
```

eg:
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

It's also can statistical PV and UV of uses of each function.Such as the following example is track in ActivePage function,UV statistics need to rely on `trackerId`[trackerId configuration](/mito-doc/sdk/guide/advanced-configuration/#backtrackerid-string--number)
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
