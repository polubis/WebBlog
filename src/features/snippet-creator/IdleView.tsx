import React from "react"

import { XL, M, B, Percentage, CodeFrames } from "../../ui"
import Section from "../../components/article/Section"
import Button from "../../components/button/Button"
import styled from "styled-components"
import { DEFAULT_FRAMES } from "./consts"
import { List } from "../../components/article/List"
import { IdleState, LoadingState, SnippetCreatorAction } from "./defs"

const Footer = styled.div`
  display: flex;
  height: 40px;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  ${Footer} {
    margin-top: 40px;
  }
`

interface IdleViewProps {
  state: IdleState | LoadingState
  action: SnippetCreatorAction
}

const IdleView = ({ state, action }: IdleViewProps) => {
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
          <List items="In presentations, In Linkedin | Twitter | other social platforms posts, In your articles as gif, As video, As recorded gif, As sharable link" />
        </Section>
        <CodeFrames delay={2500} frames={DEFAULT_FRAMES} />
        <Footer>
          {state.key === "idle" && (
            <Button disabled={state.key !== "idle"} onClick={action.start}>START</Button>
          )}
          {state.key === "loading" && <Percentage />}
        </Footer>
      </Container>
    </>
  )
}

export { IdleView }
