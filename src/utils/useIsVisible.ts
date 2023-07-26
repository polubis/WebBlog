import { useEffect, useRef, useState } from "react"
import { isInSSR } from "./isInSSR"

interface Config {
  threshold?: number
  useOnce?: boolean
}

export const useIsVisible = (
  { threshold, useOnce }: Config = { threshold: 1 }
) => {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInSSR()) return

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (useOnce && isIntersecting && ref.current) {
          observer.unobserve(ref.current)
        }

        setIsVisible(isIntersecting)
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}
