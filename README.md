# next-analytics

Provides drop-in support (including track, identify, etc) for Google Analytics, Plausible, Indicative, Logrocket, Full Story, etc.

It's meant to be a replacement for Segment without having to pay for Segment

# Installation

```
yarn add next-analytics
```

then add to `pages/_app.jsx` or `pages/_app.tsx`

```
import Analytics from "next-analytics"
import GA from "next-analytics-ga"
import LogRocket from "next-analytics-logrocket"

function MyApp({ Component, pageProps }) {
  const providers = [
    GA("G-12345678"),
    LogRocket("your/id")
  ]

  return (
    <Analytics providers={providers}>
      <Component {...pageProps} />
    </Analytics>
  )
}
```

Now you can use the React hook in any Component:

```
import { useAnalytics } from "next-analytics"

function WaitlistForm() {
  const { identify, track } = useAnalytics()

  const handleSubmit = () => {
    someApiCall(...).then((res) => {
      identify("email or phone or ID")
      track("Waitlist", { email: ..., /* any props you want to pass on */ })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      ...
    <form>
  )
}
```
