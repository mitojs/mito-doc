---
title: "基础配置"
description: "配置浏览器与小程序 SDK 共用的上报地址、行为栈、重复错误限制、用户标识及基础钩子。"
sidebar:
  label: "基础配置"
---

<span class="legacy-anchor" id="基础配置"></span>



**以下是基础配置,[@mitojs/browser](/mito-doc/zh-CN/sdk/guide/browser/) 和 [@mitojs/wx-mini](/mito-doc/zh-CN/sdk/guide/wx-mini/) 都可以传入使用 😎**

## 基础属性

### dsn?: string
上报到服务端的url

### disabled?: boolean
默认是false，为true时，sdk将不会初始化

### apikey?: string
默认是''，表示每个项目都应该有一个唯一值

### debug?: boolean
默认是关闭的，当为true时将会在控制台打印收集到的数据（建议在开发环境设为true）

### maxDuplicateCount?: number
默认值是2，表示同一个错误上报的最大次数

### maxBreadcrumbs?: number
默认值是20，如果设置的值大于100，将用100取代。表示最大用户行为栈的长度

### vue?: VueInstance
vue的根实例，查看[@mitojs/vue 使用指南](/mito-doc/zh-CN/sdk/guide/vue/)


## 基础钩子


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

## 多实例
从版本`2.1.28`开始，`mitojs`就升级成了多实例，每个实例下的配置项和hooks都是隔离的，每个实例下的所有属性和数据也是隔离。配置多个实例，方便在多个业务方之间定制不同的需求，还可以上报到不同`dsn`

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
* 用户行为栈的存储类，你可通过该属性拿到sdk收集到的信息 
```js
const breadcrumbStack = MitoInstance.breadcrumb.getStack()
```

* 可以在这个行为栈后面追加一条
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
当然你可以完全不按照上面的声明类型`push`也是可以的，但是推荐是按照同一种数据结构，方便遍历。

* 可以清空当前用户行为栈
`MitoInstance.breadcrumb.clear()`

### MitoInstance.getOptions()
这个方法可以获取当前你传入的全部配置项


### MitoInstance.transport
* 你可以直接调用`send`方法将你想要上报的数据直接上传 <strong>不推荐</strong>

第一参数是你想要上报的数据，第二个参数是breadcrumb

`MitoInstance.transport.send(yourData, MitoInstance.breadcrumb.getStack())`


<span class="legacy-anchor" id="mitoinstancelog"></span>

### MitoInstance.log  <strong>推荐</strong>
你可以在任何地方通过`mito`的实例调用`log`
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


有时候我们需要在业务代码中上报业务信息或者埋点信息，这时可以使用`MitoInstance.log`。下面的示例展示了当http请求出错时手动上报
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

也可以每个功能的收集PV和UV。比如下面的示例：在`ActivePage`函数中埋点，UV统计是依赖于`trackerId`[trackerId configuration](/mito-doc/zh-CN/sdk/guide/advanced-configuration/#backtrackerid-string--number)
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

### MitoInstance.SDK_VERSION
该属性可以获取当前的sdk版本
