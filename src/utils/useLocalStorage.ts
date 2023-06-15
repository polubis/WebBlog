import { useMemo, useState } from "react"
import { isInSSR } from "./isInSSR"

const initialize = <T extends unknown>(key: string, initialState: T): T => {
  if (isInSSR()) return initialState;
    
  const data = localStorage.getItem(key)

  if (!data) {
    return initialState
  }

  return JSON.parse(data) as T
}

const useLocalStorage = <T extends unknown>(key: string, initialState: T) => {
  const initializedState = useMemo(() => initialize(key, initialState), [])
  const [state, setState] = useState(initializedState)

  const set = (newState: T): void => {
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }

  return [state, { set }] as const
}

export { useLocalStorage }
