import splitbee from "@splitbee/web"
import { AnalyticsInstance } from "analytics"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

// @todo add params from https://docs.logrocket.com/reference#console
type IPluginConfig = {
  token: string
  pageEvent?: string
  disableCookie?: boolean
  scriptUrl?: string
  apiUrl?: string
}

const defaultConfig = {
  pageEvent: "PageVisit",
  disableCookie: false,
  scriptUrl: "https://cdn.splitbee.io/sb.js",
  apiUrl: "https://hive.splitbee.io",
}

export default function logrocket(pluginConfig: IPluginConfig) {
  return {
    name: "splitbee-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: (plugin: IPluginProps) => {
      const { pageEvent, ...config } = plugin.config
      splitbee.init(config)
    },

    loaded: () => {
      // LogRocket loaded via package, no need to check for window existence.
      return true
    },

    identify: (props) => {
      const { payload } = props
      splitbee.user.set({
        id: payload.userId,
        ...payload.traits,
      })
    },

    page: (opts) => {
      const { payload, config } = opts
      const { properties } = payload
      splitbee.track(config.pageEvent, properties)
    },

    track: ({ payload }) => {
      const { properties, event } = payload
      splitbee.track(event, properties)
    },
  }
}
