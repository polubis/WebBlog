import { useRef } from "react"

export const useScrollTo = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollTop = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  return {
    containerRef,
    scrollTop,
    scrollBottom,
  }
}
