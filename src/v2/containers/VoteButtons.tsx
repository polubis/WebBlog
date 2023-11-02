import React from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { VoteButtonProps } from "./models"

const Button = styled.button`
  background: transparent;
  outline: none;
  border: 1px solid #fff;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lexend", sans-serif;

  &:hover:not(:disabled) {
    cursor: pointer;
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

export const VoteUpButton = ({ onClick, disabled, vote }: VoteButtonProps) => {
  const layout = useLayoutProvider()

  return (
    <Button
      title={layout.t.like_this}
      disabled={disabled}
      className="center"
      onClick={onClick}
    >
      👍 {vote ?? 0}
    </Button>
  )
}

export const VoteDownButton = ({
  onClick,
  vote,
  disabled,
}: VoteButtonProps) => {
  const layout = useLayoutProvider()
  return (
    <Button
      disabled={disabled}
      title={layout.t.i_dont_like_this}
      className="center"
      onClick={onClick}
    >
      👎 {vote ?? 0}
    </Button>
  )
}
