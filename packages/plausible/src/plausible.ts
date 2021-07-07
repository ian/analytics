import { AnalyticsInstance } from "analytics"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

type IPluginConfig = {
  domain: string
}

interface IProps {
  payload: IPayload
}

type IPayload = {
  event: string
  properties: object
}

const defaultConfig = {
  enabled: true,
}

export default function plausible(pluginConfig: IPluginConfig) {
  return {
    name: "plausible-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: (plugin: IPluginProps) => {
      if (typeof document === "undefined") return 
      const { config, instance } = plugin
      const { domain } = config

      const script = document.createElement("script")
      script.async = true
      script.defer = true
      script.src = "https://plausible.io/js/plausible.js"
      script["data-domain"] = domain

      document.body.appendChild(script)
    },

    loaded: () => {
      return typeof window !== "undefined" && Boolean(window["plausible"])
    },

    // Set parameter scope at event level with 'event' method
    track: ({ payload }: IProps) => {
      const { properties, event } = payload
      typeof window !== "undefined" && window["plausible"](event, properties)
    },
  }
}
