import { useEffect, useRef } from "react"

interface UseClickOutsideConfig {
  onOutside: () => void
}

const useClickOutside = <T extends HTMLElement>({
  onOutside,
}: UseClickOutsideConfig) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      ref.current?.contains(e.target as Node) || onOutside()
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return { ref }
}

export { useClickOutside }
