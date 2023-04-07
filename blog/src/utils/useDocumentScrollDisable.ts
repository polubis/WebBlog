import { useLayoutEffect } from "react"
import { isInSSR } from "./isInSSR"

export const useDocumentScrollDisable = (disabled: boolean): void => {
  useLayoutEffect(() => {
    if (isInSSR()) {
      return
    }

    if (disabled) {
      document.body.style.position = "fixed"
    } else {
      document.body.style.position = "static"
    }

    return () => {
      document.body.style.position = "static"
    }
  }, [disabled])
}
