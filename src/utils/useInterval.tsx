import { useEffect, useMemo } from "react"
import { Subject, interval, switchMap, takeUntil, tap } from "rxjs"

interface Config {
  delay?: number
  onTick: () => void
}

const useInterval = (config: Config) => {
  const started = useMemo(() => new Subject<number>(), [])
  const started$ = useMemo(() => started.asObservable(), [])

  const cancelled = useMemo(() => new Subject<void>(), [])
  const cancelled$ = useMemo(() => cancelled.asObservable(), [])

  const start = (): void => {
    started.next(config.delay ?? 5000)
  }

  const cancel = (): void => {
    cancelled.next()
  }

  useEffect(() => {
    const sub = started$
      .pipe(
        switchMap(delay =>
          interval(delay).pipe(tap(config.onTick), takeUntil(cancelled$))
        )
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return {
    start,
    cancel,
  }
}

export { useInterval }
