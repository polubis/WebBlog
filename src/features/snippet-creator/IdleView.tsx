import React, { useEffect, useState } from "react"

import { XL, M, B, Code, Percentage, useModal, Modal } from "../../ui"
import Section from "../../components/article/Section"
import Button from "../../components/button/Button"
import styled from "styled-components"
import { DEFAULT_FRAMES } from "./consts"
import { List } from "../../components/article/List"
import { useInterval } from "./useInterval"
import { IdleState, LoadingState, SnippetCreatorAction } from "./defs"
import Img from "../../components/article/Img"

const Footer = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  .code-snippet-showcase pre {
    min-height: 400px;
  }

  ${Footer} {
    margin-top: 40px;
  }
`

interface IdleViewProps {
  state: IdleState | LoadingState
  action: SnippetCreatorAction
}

const IdleView = ({ state, action }: IdleViewProps) => {
  const modal = useModal()
  const [idx, setIdx] = useState(0)
  const interval = useInterval({
    delay: 2500,
    onTick: () => {
      setIdx(prev => {
        const nextIdx = prev + 1
        return nextIdx === DEFAULT_FRAMES.length ? 0 : nextIdx
      })
    },
  })

  useEffect(interval.start, [])

  return (
    <>
      <Container>
        <Section>
          <XL>Welcome to our tool for animating code snippets</XL>
          <M>
            Paste a few <B>code snippets</B> and then use{" "}
            <B>keyboard shortcuts</B> or <B>mouse</B> to show the result of your
            refactoring, explain complicated code or simply prepare something
            more than a static code snippet.
          </M>
          <M>Where and how you can use it?</M>
          <List items="In presentations, In Linkedin | Twitter | other social platforms posts, In your articles as standalone component, As video - automatically generated, As recorded gif - automatically generated, As sharable link" />
        </Section>
        <Code className="code-snippet-showcase" animated>
          {DEFAULT_FRAMES[idx]}
        </Code>
        <Footer>
          {state.key === "idle" && (
            <>
              <Button onClick={action.start}>START</Button>
              <Button onClick={modal.toggle}>TUTORIAL</Button>
            </>
          )}
          {state.key === "loading" && <Percentage />}
        </Footer>
      </Container>
      {modal.isOpen && (
        <Modal onClose={modal.toggle}>
          <Img
            description="This shows how you can use our application"
            src="/snippets-creator-demo.gif"
          />
        </Modal>
      )}
    </>
  )
}

export { IdleView }
