import { AnalyticsInstance } from "analytics"
import { Plausible } from "plausible-client"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

type IPluginConfig = {
  apiHost?: string,
  domain?: string,
  hashMode?: boolean,
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
  plausible: Plausible | null
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
      } = config

      context.plausible = new Plausible({
        domain: domain || (typeof window !== 'undefined' ? window.location.hostname : ''),
        apiHost: apiHost || 'https://plausible.io',
      })
    },

    loaded: () => {
      return Boolean(context.plausible)
    },

    page: ({ payload }: IProps) => {
      if (!context.plausible) return

      const { properties } = payload
      context.plausible.sendEvent('pageview', { 
        props: properties 
      })
    },

    // Set parameter scope at event level with 'event' method
    track: ({ payload }: IProps) => {
      if (!context.plausible) return

      const { properties, event } = payload
      context.plausible.trackEvent(event, { props: properties })
    },
  }
}
