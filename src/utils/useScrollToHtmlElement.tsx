import { useRef } from "react"

export const useScrollToHtmlElement = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)

  const scrollTop = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  return {
    ref,
    scrollTop,
    scrollBottom,
  }
}
