import React, { useRef } from "react"
import { useElementSize } from "./useElementSize"

const WindowSize = () => {
  const [state] = useElementSize()

  if (state.status === "unsupported") {
    return <div>It's probably server side rendering...</div>
  }

  if (state.status === "undetected") {
    return <div>Detecting...</div>
  }

  return (
    <>
      <div>Window height: {state.height}</div>
      <div>Window width: {state.width}</div>
    </>
  )
}

const HTMLElementsSize = () => {
  // Ref is required to read size for useElementSize.
  const ref = useRef<HTMLDivElement | null>(null)
  const [state] = useElementSize({ ref })

  return (
    <div ref={ref}>
      {state.status === "detected" && (
        <>
          <div>Div height: {state.height}</div>
          <div>Div width: {state.width}</div>
        </>
      )}
    </div>
  )
}
