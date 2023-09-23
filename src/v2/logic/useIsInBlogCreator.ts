import { useLayoutProvider } from "../providers/LayoutProvider"

const url = (): string => window.location.pathname + window.location.search

const useIsInBlogCreator = () => {
  const layout = useLayoutProvider()

  const is = (): boolean => url().includes(layout.routes.creator.to)

  return { is, url }
}

export { useIsInBlogCreator }
