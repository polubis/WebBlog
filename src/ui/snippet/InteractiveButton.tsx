import React, {
  MouseEventHandler,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react"
import styled from "styled-components"

const FeedbackButton = styled.button`
  padding: 8px;
  background: transparent;
  outline: none;
  border: 1px solid #c7bdbd;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  font-family: "Lexend", sans-serif;

  &:hover {
    cursor: pointer;
    background: #c7bdbdab;
  }
`

type InteractiveButtonStatus = "idle" | "pending"

interface InteractiveButtonProps {
  children: (status: InteractiveButtonStatus) => ReactNode
  delay?: number
  onClick: MouseEventHandler<HTMLButtonElement>
}

const InteractiveButton = ({
  children,
  onClick,
  delay = 1000,
}: InteractiveButtonProps) => {
  const [status, setStatus] = useState<InteractiveButtonStatus>("idle")

  const timeout = useRef<NodeJS.Timeout | null>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    timeout.current && clearTimeout(timeout.current)

    setStatus("pending")

    timeout.current = setTimeout(() => {
      setStatus("idle")
    }, delay)

    onClick(e)
  }

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current)
    }
  }, [])

  return (
    <FeedbackButton onClick={handleClick}>{children(status)}</FeedbackButton>
  )
}

export type { InteractiveButtonProps }

export { InteractiveButton }
