import { AnalyticsInstance } from "analytics"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

type IPluginConfig = {
  pixelId: string
}

interface IProps {
  payload: IPayload
}

type IPayload = {
  event: string
  properties: object
}

const defaultConfig = {}

export default function indicative(pluginConfig: IPluginConfig) {
  return {
    name: "indicative-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: (plugin: IPluginProps) => {
      const { config } = plugin
      const { pixelId } = config

      eval(
        `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${pixelId}');rdt('track', 'PageVisit');`
      )
    },

    loaded: () => {
      return Boolean(window["rdt"])
    },

    // Reddit has no identify functionality
    // identify: (props: IProps) => {},

    page: () => {
      window["rdt"]("track", "PageVisit")
    },

    track: ({ payload }: IProps) => {
      const { event } = payload
      window["rdt"]("track", event)
    },
  }
}
