# Analytics Indicative Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [Indicative](https://www.indicative.com/)

## Installation

```
npm install analytics analytics-plugin-indicative --save
```

## Usage

```
import Analytics from "analytics"
import indicativePlugin from "analytics-plugin-indicative"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    indicativePlugin({
      apiKey: "...",
    }),
  ],
})
```
