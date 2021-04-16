// @ts-nocheck
import axios from "axios"
import { AnalyticsInstance } from "analytics"

type IPluginProps = {
  instance: AnalyticsInstance
  config: IPluginConfig
}

type IPluginConfig = {
  apiKey: string
  recordSessions?: boolean
  sessionsThreshold?: number
  cookiesOnMainDomain?: boolean
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
  recordSessions: true,
  sessionsThreshold: 30,
  cookiesOnMainDomain: true,
}

export default function indicative(pluginConfig: IPluginConfig) {
  var isInitialized = false

  return {
    name: "indicative-analytics",
    config: {
      ...defaultConfig,
      ...pluginConfig,
    },

    initialize: (plugin: IPluginProps) => {
      const { config, instance } = plugin
      const { apiKey } = config

      const script = document.createElement("script")
      script.src = "//cdn.indicative.com/js/1.0.2/Indicative.min.js"
      script.type = "text/javascript"
      script.async = true

      script.onload = script.onreadystatechange = function () {
        var rs = this.readyState
        if (isInitialized || (rs && rs != "complete" && rs != "loaded")) return
        isInitialized = true
        window.Indicative.initialize(apiKey, config)
      }

      document.body.appendChild(script)
    },

    loaded: () => {
      return Boolean(window["Indicative"])
    },

    identify: (props: IProps) => {
      const { payload, config } = props
      // Indicative has NO identify() call in their JS file. Bug reported, for now just make the call manually
      axios
        .post(`https://api.indicative.com/service/alias/${config.apiKey}`, {
          previousId: payload.anonymousId,
          newId: payload.userId,
        })
        .then(() => {
          axios.post(
            `https://api.indicative.com/service/identify/${config.apiKey}`,
            {
              uniqueId: payload.userId,
              properties: payload.traits,
            }
          )
        })
    },

    page: ({ payload, config, instance }: IProps) => {
      const { properties } = payload
      window.Indicative.buildEvent("Page View", properties)
    },

    // Set parameter scope at event level with 'event' method
    track: ({ payload }: IProps) => {
      const { event, properties } = payload
      window.Indicative.buildEvent(event, properties)
    },
  }
}
