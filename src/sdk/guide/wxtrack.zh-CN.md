---
title: @wx-track
order: 8
toC: menu
nav:
  title: SDK
  order: 1
---

# 微信小程序埋点

由于埋点过于业务性，所以这次小程序的埋点只提供一些`hooks`和上报方法，不过可以利用这些`hooks`来个性化定制埋点上报


### 小程序hooks
本身SDK重写大部分微信小程序的埋点，[hooks文档](./wx-mini.md#wxhookoptionstype)

### 无痕埋点
* 页面无痕

如果想做页面无痕，则需要在`mito`暴露出的`pageOnShow`和`pageOnHide`中进行无痕埋点，`pageOnShow`也就是wx中原生的`pageOnShow`事件，这里说明一下，`mitojs/wx-mini`中的`pageOnShow`是在原生的`pageOnShow`执行完后才执行的。比如如下的伪代码：

```js
function pageOnShow(page: IWxPageInstance) {
  // 进入页面埋点
}
function pageOnHide(page: IWxPageInstance) {
  // 离开页面埋点
}
MITO.init({
  trackDsn:''
  pageOnShow,
  pageOnHide
})
```
* 事件无痕

由于微信小程序拿不到点击节点的`tagName`、`domPath`（从根路径到该节点的路径），所以无法对按钮做唯一性校验，也就无法做抛出比较有用的hook（如果有小伙伴有任何方法的话可以微信告诉我，不胜感激，[微信二维码](https://github.com/mitojs/mitojs#issue)）

### 手动埋点
每个公司的埋点业务都是不一样的，手动埋点的规范也是如此，我这边粗略的定义了我几个类型：

```js
export enum TrackActionType {
  // 页面曝光
  PAGE = 'PAGE',
  // 事件埋点
  EVENT = 'EVENT',
  // 区域曝光
  VIEW = 'VIEW',
  // 时长埋点
  DURATION = 'DURATION',
  // 区域曝光的时长埋点
  DURATION_VIEW = 'DURATION_VIEW'
  // 其他埋点类型
  OTHER = 'OTHER'
}
```
并且暴露了一个方法：`trackSend`

### trackSend
```js
// main.js
import { init } from '@mitojs/wx-mini'

const MitoInstance = init({
  // 开发环境可以开启debug，生成环境改为false
  debug:true,
  dsn: 'https://test.com/yourInterface',
})
MitoInstance.trackSend({
  // uuid
  id?: string
  // 埋点code 一般由人为传进来，可以自定义规范
  trackId?: string
  // 埋点类型，可扩展
  actionType?: TrackActionType | any
  // 埋点开始时间
  startTime?: number
  // 埋点停留时间
  durationTime?: number
  // 上报时间
  trackTime?: number
  // 不需要重写，默认为true，表示埋点类型的上报，不用进行errorId生成
  isTrack?: boolean
  // anything for developer
  ...
})
```
正常的上报会走`errorId`生成，该方法上报的数据格式中有`isTrack:true`，所以会略过`errorId`的生成


