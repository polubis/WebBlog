import { useEffect, useRef } from "react"
import type { InteractiveProps } from "./models"
import { useModal } from "../../../ui"

export const Interactive = ({ children, delay = 1500 }: InteractiveProps) => {
  const { open, close, isOpen } = useModal()

  const ref = useRef<NodeJS.Timeout | null>(null)

  const cleanUpTimeout = () => {
    if (ref.current) {
      clearTimeout(ref.current)
    }
  }

  const setupTimeout = () => {
    cleanUpTimeout()
    ref.current = setTimeout(close, delay)
  }

  useEffect(() => {
    return () => {
      cleanUpTimeout()
    }
  }, [])

  return children({
    start: () => {
      setupTimeout()
      open()
    },
    active: isOpen,
  })
}
