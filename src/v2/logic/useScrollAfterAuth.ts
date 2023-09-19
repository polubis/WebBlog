import { useLayoutEffect } from "react"
import { isInSSR } from "../../utils/isInSSR"
import { summary_footer_id, scroll_to_key } from "../core/consts"

const useScrollAfterAuth = (
  localStorageKey = scroll_to_key,
  elementId = summary_footer_id
) => {
  useLayoutEffect(() => {
    if (isInSSR()) return

    const scrollTo = localStorage.getItem(localStorageKey)

    if (!scrollTo) return

    const element = document.getElementById(elementId)

    if (!element) return

    const timeout = setTimeout(() => {
      element.scrollIntoView()
      localStorage.removeItem(localStorageKey)
    }, 150)

    return () => {
      clearTimeout(timeout)
    }
  }, [localStorageKey, elementId])
}

export { useScrollAfterAuth }
