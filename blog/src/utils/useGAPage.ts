import { useEffect } from "react"
import ReactGA from "react-ga4"
import { isInSSR } from "./isInSSR"
import { isProd } from "./isProd"

export const useGAPage = page => {
  useEffect(() => {
    if (!isInSSR() && page !== undefined && isProd()) {
      ReactGA.initialize("G-NVC90KSB0J")
      ReactGA.send({ hitType: "pageview", page })
    }
  }, [])
}
