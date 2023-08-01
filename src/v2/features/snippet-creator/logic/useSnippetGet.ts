import { isInSSR } from "../../../../utils/isInSSR"
import { Signal, useFetch } from "../../../../utils/useFetch"
import { useQueryParams } from "../../../../utils/useQueryParams"
import { Response, Snippet } from "../../../core/models"
import { useMemo } from "react"

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

const useSnippetGet = () => {
  const [state, start] = useFetch<Snippet>()
  const params = useQueryParams()

  const id = useMemo(() => (isInSSR() ? null : params.get("id")), [])

  const load = () => {
    if (!id) {
      return
    }

    start(signal => getSnippet(signal, id))
  }

  return [id, state, load] as const
}

export { useSnippetGet }
