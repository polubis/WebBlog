import React, { useEffect, useRef, useState } from "react"
import { XL, M, Hint } from "../../ui/text"
import styled from "styled-components"
import BlogCreatorLayout from "./BlogCreatorLayout"
import { BlogPreview } from "./BlogPreview"
import { T_DOWN } from "../../utils/viewport"
import { useModal } from "../../ui"
import Loadable from "react-loadable"
import { BlogCreatorHeading } from "./BlogCreatorHeading"
import Button from "../button/Button"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { useEditor } from "./useEditor"
import { useLeavePageAlert } from "../../utils/useLeavePageAlert"

const EditableSnippet = Loadable({
  loader: () =>
    import("../../ui/snippet/EditableSnippet").then(m => m.EditableSnippet),
  loading: () => null,
})

const TemplateSelector = Loadable({
  loader: () => import("./TemplateSelector").then(m => m.TemplateSelector),
  loading: () => null,
})

const FullScreenCreator = Loadable({
  loader: () => import("./FullScreenCreator").then(m => m.FullScreenCreator),
  loading: () => null,
})

const ErrorsSection = Loadable({
  loader: () => import("./ErrorsSection").then(m => m.ErrorsSection),
  loading: () => null,
})

const BlogCreatorLoader = Loadable({
  loader: () => import("./BlogCreatorLoader").then(m => m.BlogCreatorLoader),
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

const Heading = styled.header`
  height: 112px;
`

export default function () {
  const { track } = useCustomGAEvent()
  const { isOpen, open, close } = useModal()
  const [
    { currentMdx, mdx, hasErrors, changed },
    { change, markAsBroken },
  ] = useEditor()
  const [loading, setLoading] = useState(false)

  const ref = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    setLoading(true)
    track({ name: "full_screen_clicked" })
    document.body.style.overflow = "hidden"
    ref.current = setTimeout(open, 1500)
  }

  useLeavePageAlert({
    text:
      "After leaving this page your progress will not be saved. Are you sure?",
    active: changed,
  })

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current)
    }
  }, [])

  const Preview = <BlogPreview mdx={currentMdx} onError={markAsBroken} />
  const Editor = <EditableSnippet value={mdx} onChange={change} />
  const Errors = hasErrors ? <ErrorsSection /> : null

  return (
    <>
      {loading && (
        <BlogCreatorLoader
          onClose={() => {
            document.body.style.overflow = "auto"
            setLoading(false)
          }}
        />
      )}
      {isOpen || (
        <BlogCreatorLayout>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            A powerful editor for articles
          </h1>
          <Heading>
            <BlogCreatorHeading
              buttons={
                <Button className="full-mode-btn" onClick={handleOpen}>
                  FULL SCREEN
                </Button>
              }
            />
          </Heading>
          <Container>
            <CodeContainer>{Editor}</CodeContainer>
            <PreviewScroll>
              {Errors}
              {Preview}
            </PreviewScroll>
          </Container>
        </BlogCreatorLayout>
      )}

      {isOpen && (
        <FullScreenCreator onClose={close}>
          <>
            {Editor}
            <TemplateSelector onChange={change} />
          </>
          <>
            {Errors}
            {Preview}
          </>
        </FullScreenCreator>
      )}
    </>
  )
}
