import React, { useRef } from "react"
import styled from "styled-components"
import Section from "../../components/article/Section"
import { Snippet } from "../../models"
import { A, B, CodeFrames, M, Percentage, XL } from "../../ui"
import Button from "../../components/button/Button"
import { Link } from "gatsby"
import { FullScreenAnimation } from "../../components/full-screen-animation"
import { useSnippetPreviewState } from "./useSnippetPreviewState"
import {
  CloseFullScreenButton,
  EditButton,
  OpenFullScreenButton,
} from "../../components/snippet-creator/Buttons"
import { useKeyPress } from "../../utils/useKeyPress"
import { SnippetsErrorScreen } from "../../components/snippets-error-screen/SnippetsErrorScreen"

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;

  .close-preview-view-btn {
    path {
      fill: black;
    }

    .letter {
      transform: translate(2.5px, 2.5px) scale(0.75);
    }
  }
`

const Toolbox = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
`

const Playground = ({
  snippet,
  onClose,
}: {
  snippet: Snippet
  onClose: () => void
}) => {
  return (
    <FullScreenAnimation animated={false}>
      <Container>
        <Toolbox>
          <CloseFullScreenButton onClick={onClose} />
        </Toolbox>
        <CodeFrames frames={snippet.frames.map(frame => frame.code)} />
      </Container>
    </FullScreenAnimation>
  )
}

const LoadingScreen = () => {
  return (
    <Section>
      <XL>Give us a moment to load the snippet</XL>
      <M>
        Did you know that on our platform you can write articles using the{" "}
        <B>mdx</B> markup? If you are interested we invite you to use our{" "}
        <A href="/blog-creator/" outside>
          creator
        </A>
        .
      </M>
      <M>
        We provide content and language support. For more information you can
        contact{" "}
        <A
          outside
          href="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"
        >
          Adrian Połubiński
        </A>
        .
      </M>
      <Percentage />
    </Section>
  )
}

const SnippetPreview = () => {
  const linkRef = useRef<any | null>(null)
  const { state, asBetween, asLoaded } = useSnippetPreviewState()

  useKeyPress({
    onKeyPress: e => {
      const actions = {
        e: () => linkRef.current?.click(),
        escape: asBetween,
        f: asLoaded,
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  const { key } = state

  return (
    <>
      {(key === "idle" || key === "loading") && <LoadingScreen />}
      {key === "opening" && (
        <FullScreenAnimation>
          <Container>
            <Percentage />
          </Container>
        </FullScreenAnimation>
      )}
      {key === "between" && (
        <Section>
          <XL>Maybe you want to rework this snippet?</XL>
          <M>Nothing simpler!</M>
          <M>
            Just click on the button below and we will upload the necessary data
            and put it into our <B>creator</B>.
          </M>
          <CodeFrames frames={state.snippet.frames.map(frame => frame.code)} />
          <Footer>
            <Link to={`/snippet-creator/?id=${state.snippet.id}`} ref={linkRef}>
              <EditButton title="Play with this snippet in creator" />
            </Link>
            <OpenFullScreenButton onClick={asLoaded} />
          </Footer>
        </Section>
      )}
      {key === "loaded" && (
        <Playground snippet={state.snippet} onClose={asBetween} />
      )}
      {key === "load-fail" && (
        <SnippetsErrorScreen
          action={
            <Link to="/snippet-creator/">
              <Button className="check-blog-button">
                GENERATE YOUR SNIPPET
              </Button>
            </Link>
          }
        />
      )}
    </>
  )
}

export { SnippetPreview }
