import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { VoteButtonProps } from "./models"

export const VoteUpButton = ({ onClick, disabled, vote }: VoteButtonProps) => {
  const layout = useLayoutProvider()

  return (
    <button
      className="icon-button secondary medium rectangle"
      title={layout.t.like_this}
      disabled={disabled}
      onClick={onClick}
    >
      👍 {vote ?? 0}
    </button>
  )
}

export const VoteDownButton = ({
  onClick,
  vote,
  disabled,
}: VoteButtonProps) => {
  const layout = useLayoutProvider()
  return (
    <button
      disabled={disabled}
      title={layout.t.i_dont_like_this}
      className="icon-button secondary medium rectangle"
      onClick={onClick}
    >
      👎 {vote ?? 0}
    </button>
  )
}
