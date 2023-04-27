import React from "react"
import { XL, M, Hint, A } from "../../ui/text"
import styled from "styled-components"
import theme from "../../utils/theme"
import BlogCreatorLayout from "./BlogCreatorLayout"
import { BlogPreview } from "./BlogPreview"
import { T_DOWN } from "../../utils/viewport"
import { EditableSnippet, useModal } from "../../ui"
import Loadable from "react-loadable"
import { BlogCreatorHeading } from "./BlogCreatorHeading"
import Button from "../button/Button"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { useEditor } from "./useEditor"
import { List } from "../article/List"
import Section from "../article/Section"

const FullScreenCreator = Loadable({
  loader: () => import("./FullScreenCreator").then(m => m.FullScreenCreator),
  loading: () => null,
})

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  @media ${T_DOWN} {
    flex-flow: column;
  }
`

const CodeContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 48%;

  .ui-editable-snippet {
    overflow: unset !important;
  }

  @media ${T_DOWN} {
    width: 100%;
  }
`

const PreviewScroll = styled.div`
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  width: 48%;
  margin-left: 4%;
  padding-right: 24px;

  section {
    width: 100%;
  }

  @media ${T_DOWN} {
    width: 100%;
    max-height: 100%;
    padding-right: 0;
    margin-left: 0;
    padding-top: 42px;
    padding-bottom: 42px;
  }

  ${XL} {
    margin-bottom: 32px;
  }

  ${M} {
    margin-bottom: 12px;
  }

  ${Hint} {
    margin: 24px 0 0 0;
  }
`

const Errors = styled.div`
  display: flex;
  flex-flow: column;

  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }
`

const Heading = styled.header`
  height: 112px;
`

export default function () {
  const { track } = useCustomGAEvent()
  const { isOpen, open, close } = useModal()
  const [{ currentMdx, mdx, hasErrors }, { change, markAsBroken }] = useEditor()

  const handleOpen = () => {
    track({ name: "full_screen_clicked" })
    open()
  }

  const Preview = <BlogPreview mdx={currentMdx} onError={markAsBroken} />
  const Editor = <EditableSnippet value={mdx} onChange={change} />
  const ErrorsSection = hasErrors ? (
    <Errors>
      <Section>
        <XL>Errors detected 🔥</XL>
        <M>
          It may be caused by not supported tag usage, not closed tag or after{" "}
          {"<iframe></iframe>"} use, not closed tag or usage of not supported
          tag. Please use only tags provided in example.
        </M>
        <M>There is the list of supported tags:</M>
        <List
          items="Section - block with content, Snippet - example with code, Summary - block with summary, Prelude - Block with an introduction, Example - Block with a link to the entire example, List - Allows you to display an list, Img - Allows you to show a picture, XL - Headline text, M - Paragraph, Hint - Italic text with hint,
          A - link, B - bolding"
        />
        <Hint hasBg>
          If you still have problems please join our community on{" "}
          <A
            outside
            href="https://discord.com/channels/1090959521364586568/1100664861073088572"
          >
            Discord
          </A>{" "}
          and ask for help.
        </Hint>
        <Hint hasBg>
          Are you missing an feature? Let us know on our dedicated{" "}
          <A
            outside
            href="https://discord.com/channels/1090959521364586568/1100664181847498842"
          >
            Discord
          </A>
          !
        </Hint>
      </Section>
    </Errors>
  ) : null

  return (
    <>
      {isOpen || (
        <BlogCreatorLayout>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            A powerful editor for articles
          </h1>
          <Heading>
            <BlogCreatorHeading
              buttons={
                <Button className="full-mode-btn" onClick={handleOpen}>
                  FULL MODE
                </Button>
              }
            />
          </Heading>
          <Container>
            <CodeContainer>{Editor}</CodeContainer>

            <PreviewScroll>
              {ErrorsSection}
              {Preview}
            </PreviewScroll>
          </Container>
        </BlogCreatorLayout>
      )}

      {isOpen && (
        <FullScreenCreator onClose={close}>
          {Editor}
          <>
            {ErrorsSection}
            {Preview}
          </>
        </FullScreenCreator>
      )}
    </>
  )
}
