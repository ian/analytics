import { AnalyticsInstance } from "analytics"
import Plausible from "plausible-tracker"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

type IPluginConfig = {
  apiHost?: string,
  domain?: string,
  hashMode?: boolean,
  trackLocalhost?: boolean,
}

interface IProps {
  payload: IPayload
}

type IPayload = {
  event: string
  properties: {
    readonly [propName: string]: string;
  }
}

type IPluginContext = {
  plausible: ReturnType<typeof Plausible> | null
}

const defaultConfig = {
  enabled: true,
}

export default function plausiblePlugin(pluginConfig: IPluginConfig) {
  const context: IPluginContext = {
    plausible: null,
  }

  return {
    name: "plausible-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: ({ config }: IPluginProps) => {
      const { 
        apiHost,
        domain,
        hashMode,
        trackLocalhost,
      } = config

      const plausibleConfig = {
        apiHost,
        domain,
        hashMode,
        trackLocalhost,
      }

      context.plausible = Plausible(
        Object.keys(plausibleConfig).reduce((acc, key) => {
          if (typeof plausibleConfig[key] !== "undefined") {
            return { ...acc, [key]: plausibleConfig[key] }
          }

          return acc
        }, {})
      )
    },

    loaded: () => {
      return Boolean(context.plausible)
    },

    page: ({ payload }: IProps) => {
      if (!context.plausible) return

      const { properties } = payload
      context.plausible.trackPageview({}, { props: properties })
    },

    // Set parameter scope at event level with 'event' method
    track: ({ payload }: IProps) => {
      if (!context.plausible) return

      const { properties, event } = payload
      context.plausible.trackEvent(event, { props: properties })
    },
  }
}
