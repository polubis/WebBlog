import React, { useEffect, useState } from "react"
import { useInterval } from "../../features/snippet-creator/useInterval"
import { isInSSR } from "../../utils/isInSSR"
import { Code } from "./Code"

interface CodeFramesProps {
    delay?: number
    frames: string[]
    className?: string;
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

    useEffect(() => {
        if (!isInSSR()) interval.start()
    }, [])

    return (
        <Code className={className} animated>
            {frames[idx]}
        </Code>
    )
}

export { CodeFrames }