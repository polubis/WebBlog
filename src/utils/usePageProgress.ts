import { useLayoutEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"
import { isInSSR } from "./isInSSR"

export const usePageProgress = () => {
  const [readedIn, setReadedIn] = useState(0)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (!isInSSR()) {
      window.scrollY = 0
      const offset = 250
      const start = new Date()
      let finished = false

      const handleScroll = () => {
        if (finished) {
          return
        }

        let w =
          ((document.body.scrollTop || document.documentElement.scrollTop) /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight -
              offset)) *
          100
        setProgress(w)

        if (w >= 100) {
          setReadedIn(Math.abs(differenceInSeconds(start, new Date())))
          finished = true
        }
      }

      document.addEventListener("scroll", handleScroll)

      return () => {
        document.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return { readedIn, progress }
}
