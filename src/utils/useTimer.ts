import { useEffect, useState } from "react"
import { getDistanceFromNow } from "./timeCalculator"

interface Pending {
  status: "PENDING"
}

interface Done {
  status: "DONE"
  value: string
}

type State = Pending | Done

export const useTimer = (date: Date): State => {
  const [state, setState] = useState<State>({ status: "PENDING" })

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        status: "DONE",
        value: getDistanceFromNow(date),
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return state
}
