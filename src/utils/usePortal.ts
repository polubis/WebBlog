import { useMemo, ReactNode, ReactPortal, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { isInSSR } from "./isInSSR"

type RenderPortal = (children: ReactNode) => ReactPortal | null

type UsePortal = () => {
  render: RenderPortal
}

const usePortal: UsePortal = () => {
  const wrapper = useMemo(
    () => (isInSSR() ? null : document.createElement("div")),
    []
  )

  useLayoutEffect(() => {
    if (!wrapper) return

    document.body.appendChild(wrapper)

    return () => {
      document.body.removeChild(wrapper)
    }
  }, [])

  return {
    render: children => (wrapper ? createPortal(children, wrapper) : null),
  }
}

export { usePortal }
