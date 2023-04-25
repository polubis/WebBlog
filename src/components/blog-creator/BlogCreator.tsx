import React from "react"
import { XL, M, Hint, X } from "../../ui/text"
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

const FullScreenCreator = Loadable({
  loader: () => import("./FullScreenCreator").then(m => m.FullScreenCreator),
  loading: () => null,
})
const UpdateBadge = Loadable({
  loader: () => import("./UpdateBadge").then(m => m.UpdateBadge),
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

  & > *:first-child {
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
  const [
    { currentMdx, mdx, hasErrors, processing },
    { change, markAsBroken },
  ] = useEditor()

  const handleOpen = () => {
    track({ name: "full_screen_clicked" })
    open()
  }

  const Preview = <BlogPreview mdx={currentMdx} onError={markAsBroken} />
  const Editor = <EditableSnippet value={mdx} onChange={change} />
  const ErrorsSection = hasErrors ? (
    <Errors>
      <X>Errors detected.</X>
      <M>
        It may be caused by not supported tag usage, not closed tag or after{" "}
        {"<iframe></iframe>"} use.
      </M>
    </Errors>
  ) : null

  return (
    <>
      {processing && <UpdateBadge />}
      <BlogCreatorLayout>
        <Heading>
          <BlogCreatorHeading
            buttons={
              <Button className="full-mode-btn" onClick={handleOpen}>
                FULL MODE
              </Button>
            }
          />
        </Heading>
        <Container
          style={
            isOpen
              ? { opacity: "0", height: "1px", overflow: "hidden" }
              : undefined
          }
        >
          <CodeContainer>{Editor}</CodeContainer>

          <PreviewScroll>
            {ErrorsSection}
            {Preview}
          </PreviewScroll>
        </Container>
      </BlogCreatorLayout>

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
