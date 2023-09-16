import { useFetch } from "../../utils/useFetch"

const loadImage = async (src: string, signal: AbortSignal): Promise<string> => {
  const fetchImage = fetch(src, { signal })

  const response = await fetchImage
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)

  return url
}

const useImageLoad = () => {
  const [state, start] = useFetch<string>()

  const fetchImage = (src: string): void => {
    start(signal => loadImage(src, signal))
  }

  return [state, fetchImage] as const
}

export { useImageLoad }
