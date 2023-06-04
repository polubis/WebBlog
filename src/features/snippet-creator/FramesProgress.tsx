
import React from 'react'
import { ReadProgress } from '../../components/article/ProgressDisplayer'
import theme from '../../utils/theme'
import { SnippetFrame } from '../../models';

interface FramesProgressProps {
    frameId: number;
    frames: SnippetFrame[]
}

const FramesProgress = ({ frames, frameId }: FramesProgressProps) => {
    const currentFrameIdx = frames.findIndex(frame => frameId === frame.id)
    const progress = ((currentFrameIdx + 1) / frames.length) * 100;

    return (
        <ReadProgress
            style={{
                height: progress + "%",
                background: progress >= 100 ? theme.green : theme.primary,
            }} />
    )
}

export { FramesProgress }