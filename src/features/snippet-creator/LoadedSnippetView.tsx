import React, { ReactNode } from "react"
import Section from "../../components/article/Section"
import { CodeFrames, FooterPayload, M, XL } from "../../ui"
import { Snippet } from "../../models"
import { Fluid } from "./Fluid"
import {
  AutoPlayButton,
  NextButton,
  PreviousButton,
} from "./Buttons"
import styled from "styled-components"
import { useKeyPress } from "../../utils/useKeyPress"

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
}

const CodeFramesFooterWrapper = ({
  payload: { counter, autoPlay, setAutoPlay },
  children,
}: CodeFramesFooterWrapperProps) => {
  useKeyPress({
    onKeyPress: e => {
      const actions = {
        a: counter.previous,
        d: counter.next,
        p: () => setAutoPlay(!autoPlay),
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  return (
    <CodeFramesFooter>
      {children}
      <PreviousButton onClick={counter.previous} />
      <NextButton onClick={counter.next} />
      <AutoPlayButton
        playing={autoPlay}
        onClick={() => setAutoPlay(!autoPlay)}
      />
    </CodeFramesFooter>
  )
}

const LoadedSnippetView = ({ snippet, footer }: LoadedSnippetViewProps) => {
  return (
    <Fluid>
      <Section>
        <XL>{snippet.name}</XL>
        <M>{snippet.description}</M>
        <CodeFrames
          footer={payload => (
            <CodeFramesFooterWrapper payload={payload} children={footer} />
          )}
          frames={snippet.frames.map(frame => frame.code)}
        />
      </Section>
    </Fluid>
  )
}

export { LoadedSnippetView }
