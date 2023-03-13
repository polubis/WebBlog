import React from "react"
import { useScroll } from "./useScroll"

export const AnyComponent = () => {
  const { direction } = useScroll()

  if (direction === "idle") {
    return <div>Not scrolled yet</div>
  }

  if (direction === "down") {
    return <div>Going down</div>
  }

  return <div>Going up</div>
}
