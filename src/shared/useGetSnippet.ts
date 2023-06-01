import { Response, Snippet } from "../models"
import { RequestCallPayload } from "../utils/useFetch"
import { Signal, useRequest } from "../utils/useFetch"

const getSnippet = async (signal: Signal, id: string): Promise<Snippet> => {
  const response = await fetch(
    (process.env as any).GATSBY_API_URL + "/Snippets/" + id,
    {
      signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (response.status < 200 || response.status >= 400) {
    return Promise.reject(new Error("Error"))
  }

  const result = (await response.json()) as Response<Snippet>

  return result.data
}

const useGetSnippet = () => {
  const request = useRequest<Snippet>()

  const call = ({
    id,
    ...payload
  }: Omit<RequestCallPayload<Snippet>, "fn"> & { id: string }) => {
    request.call({
      ...payload,
      fn: signal => getSnippet(signal, id),
    })
  }

  return { ...request, call }
}

export { useGetSnippet }
