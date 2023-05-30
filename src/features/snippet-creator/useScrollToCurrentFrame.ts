import { useMemo, useEffect, useRef, useLayoutEffect } from "react"
import { Subject, debounceTime } from "rxjs"
import type { SnippetCreatorState } from "./defs"

const useScrollToCurrentFrame = <T extends HTMLElement = HTMLElement>(
  state: SnippetCreatorState
) => {
  const ref = useRef<T>(null)
  const action = useMemo(() => new Subject<SnippetCreatorState>(), [])
  const action$ = useMemo(() => action.asObservable(), [])

  const scroll = (): void => {
    action.next(state)
  }

  useEffect(() => {
    const handleScroll = (state: SnippetCreatorState): void => {
      const reference = ref.current

      if (!reference || state.key !== "interacted") {
        return
      }

      const frameIdx = state.frames.findIndex(
        frame => frame.id === state.selectedFrame.id
      )

      if (frameIdx === -1) return

      reference.scrollTo({
        left: frameIdx * 350,
        behavior: "smooth",
      })
    }

    const sub = action$.pipe(debounceTime(500)).subscribe(handleScroll)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  useLayoutEffect(() => {
    if (state.key === "interacted") {
      scroll()
    }
  }, [state])

  return { ref }
}

export { useScrollToCurrentFrame }
