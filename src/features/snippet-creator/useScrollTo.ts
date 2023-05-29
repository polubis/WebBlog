import { useMemo, useEffect } from "react"
import { Subject, throttleTime } from "rxjs"

interface Config {
  container: string
  node: string
}

const useScrollTo = (config: Config) => {
  const action = useMemo(() => new Subject<void>(), [])
  const action$ = useMemo(() => action.asObservable(), [])

  const scroll = (): void => {
    action.next()
  }

  useEffect(() => {
    const handleScroll = (): void => {
      const frames = document.querySelector(config.container)
      const active = document.querySelector(config.node)

      if (!frames || !active) {
        return
      }

      const rect = active.getBoundingClientRect()

      const widths: number[] = []
      const margins: number[] = []

      Array.prototype.forEach.call(frames.children, child => {
        const box = child.getBoundingClientRect()
        widths.push(child.width)
      })

      console.log(widths)

      frames.scrollTo({
        left: rect.width,
        behavior: "smooth",
      })
    }

    const sub = action$.pipe(throttleTime(1000)).subscribe(handleScroll)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return { scroll }
}

export { useScrollTo }
