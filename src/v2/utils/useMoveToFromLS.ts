import { useLayoutEffect } from "react"
import { isInSSR } from "../../utils/isInSSR"

export const useMoveToFromLS = (key: string) => {
  useLayoutEffect(() => {
    if (isInSSR()) return

    const id = localStorage.getItem(key)

    if (!id) return

    const element = document.getElementById(id)

    if (!element) return

    const timeout = setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" })
    })

    return () => {
      clearTimeout(timeout)
    }
  }, [])
}
