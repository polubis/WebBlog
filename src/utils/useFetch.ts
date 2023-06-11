import { useRef, useState, useEffect } from "react"

export interface Idle {
  type: "idle"
}

export interface Pending {
  type: "pending"
}

export interface Done<T> {
  type: "done"
  data: T
}

export interface Fail {
  type: "fail"
  error: unknown
}

export type State<T> = Idle | Pending | Done<T> | Fail
export type Signal = AbortController["signal"]
export type PromiseFn<R> = (signal: Signal) => Promise<R>

export interface RequestCallPayload<T> {
  fn: PromiseFn<T>
  onOk: (data: T) => void
  onStart: () => void
  onFail: (error: unknown) => void
}

export const useRequest = <T>() => {
  const ctrl = useRef<AbortController | null>(null)

  const abort = () => {
    ctrl.current?.abort()
  }

  const call = async ({ fn, onStart, onFail, onOk }: RequestCallPayload<T>) => {
    abort()

    onStart()

    ctrl.current = new AbortController()

    try {
      onOk(await fn(ctrl.current.signal))
    } catch (error: unknown) {
      if (ctrl.current.signal.aborted) {
        console.warn("Request aborted")
        return
      }

      onFail(error)
    }
  }

  useEffect(() => {
    return () => {
      abort()
    }
  }, [])

  return { call, abort }
}

export const useFetch = <T>() => {
  const { call, abort } = useRequest<T>()
  const [state, setState] = useState<State<T>>({ type: "idle" })

  const fetch = async (fn: PromiseFn<T>) => {
    call({
      fn,
      onStart: () => setState({ type: "pending" }),
      onOk: data => setState({ type: "done", data }),
      onFail: error => setState({ type: "fail", error }),
    })
  }

  return [state, fetch, abort] as const
}
