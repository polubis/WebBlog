import type { ReactPortal, ReactNode } from "react"

import { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"

const usePortal = () => {
  const wrapper = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    document.body.appendChild(wrapper)

    return () => {
      document.body.removeChild(wrapper)
    }
  }, [])

  return {
    render: (children: ReactNode): ReactPortal | null =>
      createPortal(children, wrapper),
  }
}

export { usePortal }
