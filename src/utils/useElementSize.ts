import { useEffect, useRef, useState, useMemo, MutableRefObject } from "react"
import { Subject, debounceTime } from "rxjs"

interface UndetectedState {
  status: "undetected"
}

interface Size {
  width: number
  height: number
}

interface DetectedState extends Size {
  status: "detected"
}

interface UnsupportedState {
  status: "unsupported"
}

type SizeState = UndetectedState | DetectedState | UnsupportedState

interface ElementSizeConfig {
  ref?: MutableRefObject<HTMLElement | null>
  delay?: number
}

const useElementSize = (config?: ElementSizeConfig) => {
  const [, setCounter] = useState(0)
  const state = useRef<SizeState>({
    status: "undetected",
  })
  const observerRef = useRef<ResizeObserver | null>(null)
  const changed = useMemo(() => new Subject<SizeState>(), [])
  const changed$ = useMemo(() => changed.asObservable(), [])

  const rerender = () => {
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    const sub = changed$.pipe(debounceTime(config?.delay ?? 150)).subscribe({
      next: value => {
        state.current = value
        rerender()
      },
    })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const observeElement = () => {
      if (!config?.ref?.current && !document.body) {
        changed.next({ status: "unsupported" })
        return
      }

      observerRef.current = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect

        changed.next({
          status: "detected",
          height,
          width,
        })
      })

      observerRef.current.observe(config?.ref?.current ?? document.body)
    }

    observeElement()

    return () => {
      observerRef.current!.disconnect()
    }
  }, [])

  return [state.current] as const
}

export { useElementSize }
