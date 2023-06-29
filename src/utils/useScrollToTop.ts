import { useEffect } from "react"

const useScrollToTop = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0 })
    }

    scrollToTop()
  }, [])
}

export { useScrollToTop }
