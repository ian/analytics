# Analytics Reddit Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [Redit Pixel](https://ads.reddit.com/)

## Installation

```
npm install analytics analytics-plugin-reddit --save
```

## Usage

```
import Analytics from "analytics"
import redditPixelPlugin from "analytics-plugin-reddit-pixel"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    redditPixelPlugin({
      pixelId: "...",
    }),
  ],
})
```
