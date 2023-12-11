import { useMemo } from "react"
import { isInSSR } from "../../utils/isInSSR"

const useLang = () => {
  return useMemo((): "pl" | "en" | null => {
    if (isInSSR()) {
      return null
    }

    const [lang] = window.location.pathname
      .split("/")
      .filter(part => part.trim() !== "")

    if (lang === "pl") return "pl"

    return "en"
  }, [])
}

export { useLang }
