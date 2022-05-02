import { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { isInSSR } from "./isInSSR"

export const usePortal = () => {
  const el = useMemo(() => {
    if (isInSSR()) {
      return
    }

    return document.createElement("div")
  }, [])

  useEffect(() => {
    if (isInSSR()) {
      return
    }

    document.body.prepend(el)

    return () => {
      if (isInSSR()) {
        return
      }

      document.body.removeChild(el)
    }
  }, [])

  if (isInSSR()) {
    return () => null
  }

  return children => createPortal(children, el)
}
