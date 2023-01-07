import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"
import { toHMS } from "../../utils/toHMS"
import { usePageProgress } from "../../utils/usePageProgress"

const TRESHOLDS = [
  [60, "Don't scroll, just read it 🐼"] as const,
  [180, "Well, let me believe you've read it 🐍"] as const,
  [240, "Holy cow, did you really read this? Thanks! 🤓"] as const,
  [480, "Thanks for reading 🤓"] as const,
  [1000, "Hmmm... Are you afk? 🤓"] as const,
  [100000, "Thanks 🤓"] as const,
] as const

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-15px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const ReadTimeStats = styled.div`
  position: fixed;
  bottom: 0;
  left: 4px;
  padding: 4px 6px;
  background: ${theme.green};
  animation: ${slideIn} 0.4s ease-in-out 0s forwards;
  opacity: 0;
  border-top-right-radius: 4px;
  max-width: 220px;
`

const ReadProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 100vh;
  transition: 0.3s height ease-in-out;
`

const ReadStatsManager = ({ readedIn }: { readedIn: number }) => {
  const [message, setMessage] = useState("")
  const [hide, setHide] = useState(false)

  useEffect(() => {
    if (readedIn > 0) {
      const appearTimeout = setTimeout(() => {
        const [, messageToSet] = TRESHOLDS.find(
          ([treshold]) => readedIn <= treshold
        )!
        setMessage(messageToSet)
      }, 2000)
      const hideTimeout = setTimeout(() => {
        setHide(true)
      }, 10000)

      return () => {
        clearTimeout(appearTimeout)
        clearTimeout(hideTimeout)
      }
    }
  }, [readedIn])

  if (readedIn > 0 && !hide) {
    return (
      <>
        {message === "" ? (
          <ReadTimeStats>{toHMS(readedIn)}</ReadTimeStats>
        ) : (
          <ReadTimeStats>{message}</ReadTimeStats>
        )}
      </>
    )
  }

  return null
}

export const ProgressDisplayer = () => {
  const { readedIn, progress } = usePageProgress()

  return (
    <>
      <ReadProgress
        style={{
          height: progress + "%",
          background: progress >= 100 ? theme.green : theme.primary,
        }}
      />
      <ReadStatsManager readedIn={readedIn} />
    </>
  )
}
