import { useMemo, useEffect } from "react"
import { useState } from "react"
import { INIT_MDX } from "./config"
import { Subject, debounceTime, tap } from "rxjs"

const useEditor = (initMdx = INIT_MDX) => {
  const [mdx, setMdx] = useState(initMdx)
  const [currentMdx, setCurrentMdx] = useState(mdx)
  const [hasErrors, setHasErrors] = useState(false)

  const mdxChanged = useMemo(() => new Subject<string>(), [])
  const mdxChanged$ = useMemo(() => mdxChanged.asObservable(), [])

  const handleChange = (value: string): void => {
    setMdx(value)
    setHasErrors(false)
    mdxChanged.next(value)
  }

  const markAsBroken = () => {
    setHasErrors(true)
  }

  useEffect(() => {
    const sub = mdxChanged$
      .pipe(
        debounceTime(1000),
        tap(value => {
          setCurrentMdx(value)
        })
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return [
    { currentMdx, mdx, hasErrors },
    { change: handleChange, markAsBroken },
  ] as const
}

export { useEditor }
