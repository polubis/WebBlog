import { useEffect, useRef, useState, useMemo, MutableRefObject } from "react"
import { Subject, debounceTime } from "rxjs"

// Shape for initial state before detection.
interface UndetectedState {
  status: "undetected"
}

// Helper interface.
interface Size {
  width: number
  height: number
}

// State for shape when size is detected.
interface DetectedState extends Size {
  status: "detected"
}

// State for shape when rendering on server or ref is null.
interface UnsupportedState {
  status: "unsupported"
}

// Union of interfaces for good type-safety.
type SizeState = UndetectedState | DetectedState | UnsupportedState

// Configuration for hook.
interface ElementSizeConfig {
  // JSX node ref.
  ref?: MutableRefObject<HTMLElement | null>
  // Delay between state updates.
  delay?: number
}

const useElementSize = (config?: ElementSizeConfig) => {
  const [, setCounter] = useState(0)
  // State handled with ref to read always current values.
  const state = useRef<SizeState>({
    status: "undetected",
  })

  // State handled with ref to read always current values.
  const observerRef = useRef<ResizeObserver | null>(null)

  const changed = useMemo(() => new Subject<SizeState>(), [])
  const changed$ = useMemo(() => changed.asObservable(), [])

  const rerender = () => {
    // Function which triggers rerender.
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    // Listening for new shares and handling state
    // changes and debounceTime used to improve performance.
    const sub = changed$.pipe(debounceTime(config?.delay ?? 150)).subscribe({
      next: value => {
        state.current = value
        rerender()
      },
    })

    return () => {
      // Clean up.
      sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const observeElement = () => {
      if (!config?.ref?.current && !document.body) {
        // If we render on the server side or there is no
        // ref value assigned - we cannot read the value.
        changed.next({ status: "unsupported" })
        return
      }

      observerRef.current = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect

        // Listening for change in
        // status and issuing shares to update it.
        changed.next({
          status: "detected",
          height,
          width,
        })
      })

      // Connecting observer.
      observerRef.current.observe(config?.ref?.current ?? document.body)
    }

    observeElement()

    return () => {
      // Clean up.
      observerRef.current?.disconnect()
    }
  }, [])

  return [state.current] as const
}

export type { SizeState }

export { useElementSize }
