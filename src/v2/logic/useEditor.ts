import { useMemo, useEffect } from "react"
import { useState } from "react"
import { Subject, debounceTime, tap } from "rxjs"

const useEditor = initMdx => {
  const [mdx, setMdx] = useState(initMdx)
  const [currentMdx, setCurrentMdx] = useState(mdx)
  const [hasErrors, setHasErrors] = useState(false)
  const [changed, setChanged] = useState(false)

  const mdxChanged = useMemo(() => new Subject<string>(), [])
  const mdxChanged$ = useMemo(() => mdxChanged.asObservable(), [])

  const handleChange = (value: string): void => {
    setMdx(value)
    setHasErrors(false)
    setChanged(true)
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
    { currentMdx, changed, mdx, hasErrors },
    { change: handleChange, markAsBroken },
  ] as const
}

export { useEditor }
