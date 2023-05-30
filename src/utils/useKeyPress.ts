import { useEffect } from "react"
import { throttleTime, debounceTime, fromEvent } from "rxjs"

interface Config {
  delay?: number
  strategy?: "throttle" | "debounce"
  onKeyPress: (e: KeyboardEvent) => void
}

const useKeyPress = (config: Config) => {
  useEffect(() => {
    const source = document

    if (!source) {
      return
    }

    const isDebounce = config?.strategy === "throttle"
    const delay = config?.delay ?? 500

    const sub = fromEvent(source, "keydown")
      .pipe(isDebounce ? debounceTime(delay) : throttleTime(delay))
      .subscribe(e => config.onKeyPress(e as KeyboardEvent))
    1
    return () => {
      sub.unsubscribe()
    }
  }, [config.onKeyPress])
}

export { useKeyPress }
