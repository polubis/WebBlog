import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"
import { toHMS } from "../../utils/toHMS"
import { usePageProgress } from "../../utils/usePageProgress"

interface ProgressDisplayerProps {
  labels: string[]
  delays?: number[]
}

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
  z-index: 103;
`

const ReadProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 100vh;
  transition: 0.3s height ease-in-out;
  z-index: 103;
`

const ReadStatsManager = ({
  readedIn,
  labels,
  delays,
}: { readedIn: number } & ProgressDisplayerProps) => {
  const [message, setMessage] = useState("")
  const [hide, setHide] = useState(false)

  useEffect(() => {
    if (readedIn > 0) {
      const appearTimeout = setTimeout(() => {
        const foundDelayIdx = (delays ?? []).findIndex(
          delay => readedIn <= delay
        )!
        setMessage(labels[foundDelayIdx])
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

const ProgressDisplayer = ({
  labels,
  delays = [60, 180, 240, 480, 1000, 100000],
}: ProgressDisplayerProps) => {
  const { readedIn, progress } = usePageProgress()

  return (
    <>
      <ReadProgress
        style={{
          height: progress + "%",
          background: progress >= 100 ? theme.green : theme.primary,
        }}
      />
      <ReadStatsManager labels={labels} delays={delays} readedIn={readedIn} />
    </>
  )
}

export type { ProgressDisplayerProps }

export { ProgressDisplayer }
