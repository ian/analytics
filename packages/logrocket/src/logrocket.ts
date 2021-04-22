import LogRocket from "logrocket"
import { AnalyticsInstance } from "analytics"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

// @todo add params from https://docs.logrocket.com/reference#console
type IPluginConfig = {
  appId: string
}

const defaultConfig = {
  enabled: true,
}

export default function logrocket(pluginConfig: IPluginConfig) {
  return {
    name: "logrocket-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: (plugin: IPluginProps) => {
      const { config, instance } = plugin
      const { appId, ...restConfig } = config

      LogRocket.init(appId, restConfig)
    },

    loaded: () => {
      // LogRocket loaded via package, no need to check for window existence.
      return true
    },

    identify: (props) => {
      const { payload } = props
      LogRocket.identify(payload.userId, payload.traits)
    },

    track: ({ payload }) => {
      LogRocket.track(payload.event)
    },
  }
}
