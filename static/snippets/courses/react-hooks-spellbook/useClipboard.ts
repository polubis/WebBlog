import { useState, useMemo, useCallback } from "react"

// State shape when copying is unsupported.
interface ClipboardUnsupportedState {
  status: "unsupported"
}

// State shape when copying is supported.
interface ClipboardReadyState {
  status: "ready"
}

// Shape of the state when some value was copied.
interface ClipboardCopiedState {
  status: "copied"
  value: string
}

// Shape of the state when some value was copied.
interface ClipboardErrorState {
  status: "error"
  message: string
}

// Union of interfaces for type-safety.
type ClipboardState =
  | ClipboardUnsupportedState
  | ClipboardReadyState
  | ClipboardCopiedState
  | ClipboardErrorState

// Helper function to verify copying support.
const createStatus = (): ClipboardState => {
  return navigator?.clipboard ? { status: "ready" } : { status: "unsupported" }
}

const useClipboard = () => {
  // Creating status only once per hook usage.
  const initState = useMemo(createStatus, [])
  const [state, setState] = useState(initState)

  // This function is created only once per hook usage.
  const copy = useCallback(async (value: string) => {
    try {
      // Copying content.
      await navigator.clipboard.writeText(value)
      // Setting copied value and status.
      setState({ value, status: "copied" })
    } catch (error) {
      // Setting error message and status.
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
