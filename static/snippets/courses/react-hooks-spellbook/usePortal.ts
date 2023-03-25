import type { ReactPortal, ReactNode } from "react"

import { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"

// usePortal is an implementation of the facade pattern.
const usePortal = () => {
  // Creates only one instance of div.
  const wrapper = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    // Adds div tag to body.
    document.body.appendChild(wrapper)

    return () => {
      // After unmounting the component - removes the div created earlier.
      document.body.removeChild(wrapper)
    }
  }, [])

  // Returns a object with function that will allow you to use the portal.
  return {
    // This anonymous function is an implementation of the factory method pattern.
    render: (children: ReactNode): ReactPortal | null =>
      createPortal(children, wrapper),
  }
}

export { usePortal }
