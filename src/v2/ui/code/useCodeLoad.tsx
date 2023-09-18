import { useFetch } from "../../../utils/useFetch"

const loadCode = async (src: string, signal: AbortSignal): Promise<string> => {
  const res = await fetch(src, { signal })

  if (res.ok) {
    const code = await res.text()
    return Promise.resolve(code)
  }

  return Promise.reject("Something went wrong")
}

const useCodeLoad = () => {
  const [state, fetchCode] = useFetch<string>()

  const load = (src: string): void => {
    fetchCode(signal => loadCode(src, signal))
  }

  return [state, load] as const
}

export { useCodeLoad }
