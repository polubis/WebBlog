import { useMemo, useEffect } from "react"
import { useState } from "react"
import { INIT_MDX } from "./config"
import { Subject, debounceTime, tap } from "rxjs"

const useEditor = () => {
  const [mdx, setMdx] = useState(INIT_MDX)
  const [currentMdx, setCurrentMdx] = useState(mdx)
  const [hasErrors, setHasErrors] = useState(false)
  const [processing, setProcessing] = useState(false)

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
        tap(() => {
          setProcessing(true)
        }),
        debounceTime(4000),
        tap(value => {
          setProcessing(false)
          setCurrentMdx(value)
        })
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return [
    { currentMdx, mdx, hasErrors, processing },
    { change: handleChange, markAsBroken },
  ] as const
}

export { useEditor }
