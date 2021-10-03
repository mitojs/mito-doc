---
title: @mitojs/react
order: 5
toC: menu
nav:
  title: SDK
  order: 1
---

# @mitojs/react

# ⚠️ 注意

**如果你想要在微信小程序里面引入，请把 `@mitojs/browser` 替换成 `@miotjs/wx-mini`**



## 🛠️ Install

``` bash
# using npm
npm install @mitojs/react @mitojs/browser
# using yarn
yarn add @mitojs/react @mitojs/browser
```



## 🥳 Usage


```js
import React from 'react'
import { init } from '@mitojs/browser'

const MitoInstance = init({
  dsn: '/upload',
  maxBreadcrumbs: 100,
})
```





### 添加 ErrorBoundary 组件

如果你使用的版本大于react16.x，可以使用 [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)组件来捕捉渲染错误和自动上报到服务端。下面是一些关于`Errorboundary`的配置，它是由`@mitojs/react`提供的。

**index.tsx**

```jsx | pure
import React from 'react'
import App from './App'
import { MitoProvider } from '@mitojs/react'
import { init } from '@mitojs/browser'


const MitoInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MitoProvider>
  )
}
```

**OtherComponent.tsx**

如果你设置正确的[dsn](./basic-configuration.zh-CN.md#dsn-string),`ErrorBoundary`组件将会自动上报react错误

```jsx | pure
import { ErrorBoundary } from '@mitojs/react'
import ChildComponent from './ChildComponent'

export default function OtherComponent() {
  const onError = (error: Error, componentStack: string) => {
    console.log('triggered is render error')
  }
  const ErrorFallback = <div>Opps,trigger render error</div>
  return (
    <>
    	// this is used index.tsx's MitoInstance
      <ErrorBoundary onError={onError} fallback={ErrorFallback}>
        <ChildComponent></ChildComponent>
      </ErrorBoundary>
    </>
  )
}
```

## 多实例

`init`函数返回一个`BrowserClient`实例，所以你多次执行`init`来获取多个实例。所有的配置项和钩子函数在多个实例间是互不影响的

```jsx | pure
import React from 'react'
import App from './App'
import { MitoProvider } from '@mitojs/react'
import { init } from '@mitojs/browser'


const MitoInstance_one = init({
  dsn: 'https://test.com/yourServer_one',
  maxBreadcrumbs: 100,
})

const MitoInstance_two = init({
  dsn: 'https://test.com/yourServer_two',
  maxBreadcrumbs: 20,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance_one}>
      // 这里将会用到MitoInstance_one实例
        <App />
    		<MitoProvider MitoInstance={MitoInstance_two}>
           // 这里将会用到MitoInstance_two实例
           <OtherComponent />
        </MitoProvider>
    </MitoProvider>
  )
}
```

## 在微信小程序中使用
如果你想在微信小程序中使用，只要把`@mitojs/browser`替换成`@mitojs/wx-mini`即可，就像下面那样：

**安装**

```bash
yarn add @mitojs/react @mitojs/wx-mini
```

```jsx | pure
import React from 'react'
import App from './App'
import { MitoProvider } from '@mitojs/react'
import { init } from '@mitojs/wx-mini'


const MitoInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MitoProvider>
  )
}
```


## 使用CDN方式 <Badge>不推荐</Badge>
不推荐使用CDN方式，因为`@mitojs/web`的`cjs`文件包含了`jsxRuntime`代码，所以这个包的大小会比其他的包大很多。

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
</header>
```

当你在`index.html`使用了CDN方式，将会有一个`MITO`的全局变量会被挂载到`window`上。然后你就可以在组件中使用它

**index.tsx**

```jsx | pure
import React from 'react'
import App from './App'

const MitoInstance = MITO.init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MITO.MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MITO.MitoProvider>
  )
}
```



