import { useEffect, useRef, MutableRefObject } from "react"

interface UseClickOutsideConfig {
  onOutside: () => void
}

interface UseClickOutsideReturn<T extends HTMLElement> {
  ref: MutableRefObject<T | null>
}

const useClickOutside = <T extends HTMLElement>({
  onOutside,
}: UseClickOutsideConfig): UseClickOutsideReturn<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      ref.current?.contains(e.target as Node) || onOutside()
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref }
}

export { useClickOutside }
