# Analytics Splitbee Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [Splitbee](https://splitbee.com/)

## Installation

```
npm install analytics analytics-plugin-splitbee --save
```

## Usage

```
import Analytics from "analytics"
import splitbeePlugin from "analytics-plugin-splitbee"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    splitbeePlugin({
      token: "...",
    }),
  ],
})
```
