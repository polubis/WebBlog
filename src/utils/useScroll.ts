import { useRef, useEffect, MutableRefObject, useState } from "react"
import { debounceTime, fromEvent } from "rxjs"

interface ScrollMetadata {
  direction: "up" | "down" | "idle"
}

interface Config {
  delay?: number
}

const createMetadata = (
  ref: MutableRefObject<ScrollMetadata>,
  metadata: ScrollMetadata
): void => {
  ref.current = metadata
}

export const useScroll = (config?: Config) => {
  const [_, setCounter] = useState(0)
  const metadata = useRef<ScrollMetadata>({
    direction: "idle",
  })

  const rerender = (): void => {
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    let prevPageYOffset = window.pageYOffset
    const delay = config?.delay ?? 50

    const handleScroll = () => {
      const currentPageYOffset = window.pageYOffset

      if (prevPageYOffset < currentPageYOffset) {
        createMetadata(metadata, { direction: "down" })
      } else {
        createMetadata(metadata, { direction: "up" })
      }

      prevPageYOffset = currentPageYOffset

      rerender()
    }

    const sub = fromEvent(window, "scroll")
      .pipe(debounceTime(delay))
      .subscribe(handleScroll)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return metadata.current
}
