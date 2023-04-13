import { useRef, useEffect, MutableRefObject, useState } from "react"
import { debounceTime, fromEvent } from "rxjs"

interface ScrollMetadata {
  direction: "up" | "down" | "idle"
}

interface Config {
  delay?: number
}

// Helper function to avoid boilerplate.
const createMetadata = (
  ref: MutableRefObject<ScrollMetadata>,
  metadata: ScrollMetadata
): void => {
  ref.current = metadata
}

export const useScroll = (config?: Config) => {
  // Just for rerender.
  const [_, setCounter] = useState(0)
  // Reference used to be able to read always up to date object.
  const metadata = useRef<ScrollMetadata>({
    direction: "idle",
  })

  // Triggers rerender.
  const rerender = (): void => {
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    let prevPageYOffset = window.pageYOffset
    const delay = config?.delay ?? 150

    // Scroll direction detection.
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

    // Listening for event scroll and a small debounce to improve performance.
    const sub = fromEvent(window, "scroll")
      .pipe(debounceTime(delay))
      .subscribe(handleScroll)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return metadata.current
}
