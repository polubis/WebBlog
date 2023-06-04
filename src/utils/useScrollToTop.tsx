import { useEffect } from "react"

const useScrollToTop = (): void => {
    useEffect(() => {
        const scrollToTop = (): void => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }

        scrollToTop()
    }, [])
}

export { useScrollToTop }