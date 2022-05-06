import { useEffect } from "react"
import ReactGA from "react-ga4"
import { isInSSR } from "./isInSSR"

export const useGAPage = page => {
  useEffect(() => {
    const isLocalHost = () => window.location.protocol === "http"

    if (!isInSSR() && !isLocalHost()) {
      ReactGA.initialize("G-NVC90KSB0J")
      ReactGA.send({ hitType: "pageview", page })
    }
  }, [])
}
