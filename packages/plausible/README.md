# Analytics Plausible Plugin

This adds [Analytics](https://github.com/DavidWells/analytics) support for [Plausible](https://plausible.io/)

## Installation

```
npm install analytics analytics-plugin-plausible --save
```

## Usage

```javascript
import Analytics from "analytics"
import plausiblePlugin from "analytics-plugin-plausible"

const analytics = Analytics({
  app: "myapp",
  plugins: [
    plausiblePlugin({
      domain: "example.com", // By default window.location.hostname
      hashMode: true, // By default 'false'
      trackLocalhost: true, // By default 'false'
      apiHost: "https://my-plausible-api.domain.com/", // By default 'https://plausible.io'
    }),
  ],
})
```

### Options

`plausiblePlugin()` accepts some [options](https://plausible-tracker.netlify.app/globals.html#plausibleinitoptions) that you may want to provide:

| Option         | Type     | Description                                                       | Default                  |
| -------------- | -------- | ----------------------------------------------------------------- | ------------------------ |
| domain         | `string` | Your site's domain, as declared by you in Plausible's settings    | `location.hostname`      |
| hashMode       | `bool`   | Enables tracking based on URL hash changes.                       | `false`                  |
| trackLocalhost | `bool`   | Enables tracking on *localhost*.                                  | `false`                  |
| apiHost        | `string` | Plausible's API host to use. Change this if you are self-hosting. | `'https://plausible.io'` |
