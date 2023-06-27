import React, { useEffect, useMemo, ReactNode, useState } from "react"
import { useInterval } from "../../features/snippet-creator/useInterval"
import { isInSSR } from "../../utils/isInSSR"
import { Code } from "./Code"
import { useCounter } from "../../utils/useCounter"

type Frames = string[]

export type FooterPayload = {
  counter: ReturnType<typeof useCounter>
  autoPlay: boolean
  setAutoPlay: (autoPlay: boolean) => void
}

export interface CodeFramesProps {
  delay?: number
  frames: Frames
  className?: string
  footer?: (payload: FooterPayload) => ReactNode
  autoPlayOnInit?: boolean
  preserveSpace?: boolean
}

export const preserveSpaceForFrames = (frames: Frames): Frames => {
  const splitted = frames.map(frame => frame.split("\n"))

  const max = splitted.reduce(
    (acc, split) => (acc >= split.length ? acc : split.length),
    0
  )

  const enhanced = frames.map((code, idx) => {
    let enhancedCode = code
    const diff = max - splitted[idx].length

    for (let i = 0; i < diff; i++) {
      enhancedCode += "\n"
    }

    return enhancedCode
  }, [])

  return enhanced
}

const CodeFrames = ({
  className,
  delay,
  frames,
  preserveSpace = true,
  footer,
  autoPlayOnInit = true,
}: CodeFramesProps) => {
  const [autoPlay, setAutoPlay] = useState(autoPlayOnInit)
  const counter = useCounter(0, frames.length)

  const interval = useInterval({
    delay,
    onTick: counter.next,
  })

  const enhancedFrames = useMemo(
    () => (preserveSpace ? preserveSpaceForFrames(frames) : frames),
    [frames, preserveSpace]
  )

  useEffect(() => {
    if (isInSSR()) {
      return
    }

    if (autoPlay) {
      interval.start()
    } else {
      interval.cancel()
    }
  }, [autoPlay])

  return (
    <Code
      className={className}
      animated
      footer={
        footer
          ? footer({
              counter,
              autoPlay,
              setAutoPlay,
            })
          : undefined
      }
    >
      {enhancedFrames[counter.counter]}
    </Code>
  )
}

export { CodeFrames }
