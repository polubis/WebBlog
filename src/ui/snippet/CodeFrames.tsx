import React, { useEffect, useMemo, useState } from "react"
import { useInterval } from "../../features/snippet-creator/useInterval"
import { isInSSR } from "../../utils/isInSSR"
import { Code } from "./Code"

type Frames = string[]

interface CodeFramesProps {
  delay?: number
  frames: Frames
  className?: string
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

const CodeFrames = ({ className, delay, frames }: CodeFramesProps) => {
  const [idx, setIdx] = useState(0)

  const interval = useInterval({
    delay,
    onTick: () => {
      setIdx(prev => {
        const nextIdx = prev + 1
        return nextIdx === frames.length ? 0 : nextIdx
      })
    },
  })

  const enhancedFrames = useMemo(() => preserveSpaceForFrames(frames), [frames])

  useEffect(() => {
    if (!isInSSR()) interval.start()
  }, [])

  return (
    <Code className={className} animated>
      {enhancedFrames[idx]}
    </Code>
  )
}

export { CodeFrames }
