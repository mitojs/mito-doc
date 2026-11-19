---
title: "源码实现"
description: "查看 MitoJS 生成 errorId 的源码与示例，了解手动上报时 tag 对错误分组的影响。"
sidebar:
  label: "源码实现"
---

<span class="legacy-anchor" id="源码实现"></span>



## 生成错误id
每次上报前都会根据数据来生成错误id。生成错误id的[源码地址](https://github.com/mitojs/mitojs/blob/master/packages/utils/src/errorId.ts)

比如`MitoInstance.log`.它的错误id是根据传入的`tag`字段来生成的，所以当你传入同样的`tag`和不同的`message`时就会生成同样的错误id，比如下面的代码：
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
上面两个例子将会生成同样的错误id。但如果`tag`值改变后，生成的错误id就会不一样
