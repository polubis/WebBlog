import { useState, useMemo, useCallback } from "react"
import { isInSSR } from "./isInSSR"

interface ClipboardUnsupportedState {
  status: "unsupported"
}

interface ClipboardReadyState {
  status: "ready"
}

interface ClipboardCopiedState {
  status: "copied"
  value: string
}

interface ClipboardErrorState {
  status: "error"
  message: string
}

type ClipboardState =
  | ClipboardUnsupportedState
  | ClipboardReadyState
  | ClipboardCopiedState
  | ClipboardErrorState

const createStatus = (): ClipboardState => {
  if (isInSSR()) {
    return { status: "unsupported" }
  }

  return navigator?.clipboard ? { status: "ready" } : { status: "unsupported" }
}

const useClipboard = () => {
  const initState = useMemo(createStatus, [])
  const [state, setState] = useState(initState)

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setState({ value, status: "copied" })
    } catch (error) {
      setState({
        message: "Something goes wrong with clipboard",
        status: "error",
      })
    }
  }, [])

  return { state, copy }
}

export type { ClipboardState }

export { useClipboard }
