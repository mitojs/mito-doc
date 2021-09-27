---
title: implemention
order: 4
toC: menu
nav:
  title: SDK
  order: 2
---

# implemention

## generate errorId
It will be generated based on the data before each report.errorId source code [click here](https://github.com/mitojs/mitojs/blob/master/packages/utils/src/errorId.ts)

Such as `MitoInstance.log`.It's generated according to the passed `tag` key,so will generate the same errorId when passed the same `tag` plus different `message`.Such as the follow:

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
