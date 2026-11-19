---
title: "Mini Program event tracking"
description: "Measure Mini Program page views, exposure time and custom events with lifecycle hooks and trackSend."
sidebar:
  label: "Mini Program tracking"
---

Tracking depends on the product. The Mini Program SDK exposes lifecycle hooks and a reporting method so you can define the events your application needs.

## Mini Program hooks

The SDK wraps common native events. See the [Mini Program hooks](/mito-doc/sdk/guide/wx-mini/#wxhookoptionstype) for signatures and examples.

## Automatic tracking

### Page views and exposure time

Use `pageOnShow` and `pageOnHide` to count page views and measure how long a page stays visible. The original tracking guide describes `pageOnShow` as running after the native callback. Check callback ordering against the version you use.

Record `startTime` and the current route when the page becomes visible. When the user leaves, subtract the start time from `Date.now()` and report the duration with the previous route.

```js
const MitoInstance = MITO.init({
  pageOnShow,
  pageOnHide
})
wx.MitoInstance = MitoInstance

const currentPage = {
  startTime: 0,
  page: null
}
function pageOnShow(page) {
  // Track entry into the page.
  wx.MitoInstance.trackSend({
    // Application-defined value.
    actionType: 'PAGE',
    route: page.route
  })
  currentPage.startTime = Date.now()
  currentPage.page = page
}
function pageOnHide(page) {
  // Track departure from the page.
  const endTime = Date.now()
  const elapsedTime = endTime - currentPage.startTime
  // Send the recorded values.
  console.log('currentPage', currentPage)
  wx.MitoInstance.trackSend({
    // Application-defined value.
    actionType: 'DURATION',
    // Exposure time.
    elapsedTime,
    // Page route.
    route: currentPage.page.route
  })
}
```

### Interaction events

WeChat Mini Programs do not expose a DOM `tagName` or a full `domPath` for the tapped element. This makes it difficult to identify buttons uniquely for automatic tracking. You can share approaches with the maintainer through the [WeChat contact page](/mito-doc/help/).

## Manual tracking

Teams can define their own event taxonomy. This example distinguishes page views, interaction events, area impressions, time on a page, time in an area and custom events.

```js
export enum TrackActionType {
  // Page view.
  PAGE = 'PAGE',
  // Interaction event.
  EVENT = 'EVENT',
  // Area impression.
  VIEW = 'VIEW',
  // Duration event.
  DURATION = 'DURATION',
  // Duration of an area impression.
  DURATION_VIEW = 'DURATION_VIEW'
  // Other application-defined events.
  OTHER = 'OTHER'
}
```

### trackSend

Call `trackSend` on the initialized SDK instance to submit an event.

```js
// main.js
import { init } from '@mitojs/wx-mini'

const MitoInstance = init({
  // Enable debug during development; set it to false in production.
  debug:true,
  dsn: 'https://test.com/yourInterface',
})
MitoInstance.trackSend({
  // uuid
  id?: string
  // An event code assigned by the application.
  trackId?: string
  // An extensible event type.
  actionType?: TrackActionType | any
  // Event start time.
  startTime?: number
  // Time spent.
  durationTime?: number
  // Report time.
  trackTime?: number
  // Defaults to true for tracking events, which skip errorId generation.
  isTrack?: boolean
  // anything for developer
  ...
})
```

Ordinary error reports generate an `errorId`. The tracking method sets `isTrack: true` so the SDK skips error ID generation.
