# Analytics Plausible Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [Plausible](https://plausible.io/)

## Installation

```
npm install analytics analytics-plugin-plausible --save
```

## Usage

```
import Analytics from "analytics"
import plausiblePlugin from "analytics-plugin-plausible"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    plausiblePlugin({
      domain: "example.com",
    }),
  ],
})
```
