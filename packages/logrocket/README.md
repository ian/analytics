# Analytics LogRocket Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [LogRocket](https://logrocket.com/)

## Installation

```
npm install analytics analytics-plugin-logrocket --save
```

## Usage

```
import Analytics from "analytics"
import logrocketPlugin from "analytics-plugin-logrocket"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    logrocketPlugin({
      appId: "...",
    }),
  ],
})
```
