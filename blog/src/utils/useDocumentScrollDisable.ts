import { useLayoutEffect } from "react"

export const useDocumentScrollDisable = (disabled: boolean): void => {
  useLayoutEffect(() => {
    if (disabled) {
      document.body.style.position = "fixed"
    } else {
      document.body.style.position = "static"
    }
  }, [disabled])
}
