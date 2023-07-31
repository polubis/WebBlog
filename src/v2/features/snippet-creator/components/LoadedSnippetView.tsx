import React, { ReactNode } from "react"
import Section from "../../../../components/article/Section"
import { CodeFrames, FooterPayload, M, XL } from "../../../../ui"
import { Fluid } from "./Fluid"
import styled from "styled-components"
import { useKeyPress } from "../../../../utils/useKeyPress"
import { MIN_FRAMES_COUNT } from "../core/config"
import { AutoPlayButton, NextButton, PreviousButton } from "../containers/Triggers"
import type { Snippet } from "../../../core/models"

interface LoadedSnippetViewProps {
  snippet: Snippet
  footer: ReactNode
}

const CodeFramesFooter = styled.div`
  display: flex;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

interface CodeFramesFooterWrapperProps {
  payload: FooterPayload
  children: ReactNode
  frames: string[]
}

const CodeFramesFooterWrapper = ({
  payload: { counter, autoPlay, setAutoPlay },
  children,
  frames,
}: CodeFramesFooterWrapperProps) => {
  useKeyPress({
    onKeyPress: e => {
      const actions = {
        a: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            counter.previous()
          }
        },
        d: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            counter.next()
          }
        },
        p: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            counter.next()
          }
        },
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  return (
    <CodeFramesFooter>
      {children}
      {frames.length > MIN_FRAMES_COUNT && (
        <>
          <PreviousButton onClick={counter.previous} />
          <NextButton onClick={counter.next} />
          <AutoPlayButton
            playing={autoPlay}
            onClick={() => setAutoPlay(!autoPlay)}
          />
        </>
      )}
    </CodeFramesFooter>
  )
}

const LoadedSnippetView = ({ snippet, footer }: LoadedSnippetViewProps) => {
  const frames = snippet.frames.map(frame => frame.code)

  return (
    <Fluid>
      <Section>
        <XL>{snippet.name}</XL>
        <M>{snippet.description}</M>
        <CodeFrames
          autoPlayOnInit={false}
          footer={payload => (
            <CodeFramesFooterWrapper
              frames={frames}
              payload={payload}
              children={footer}
            />
          )}
          frames={frames}
        />
      </Section>
    </Fluid>
  )
}

export { LoadedSnippetView }
