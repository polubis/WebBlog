import React, { useState, useEffect, useRef } from "react"
import { Content, Hint, M, XL, useModal } from "../../../ui"
import {
  BlogCreatorPageProvider,
  useBlogCreatorPageProvider,
} from "./BlogCreatorPageProvider"
import styled from "styled-components"
import { T_DOWN } from "../../../utils/viewport"
import { useLeavePageAlert } from "../../../utils/useLeavePageAlert"
import { BlogCreatorLoader } from "./containers/BlogCreatorLoader"
import { BlogCreatorHeading } from "./containers/BlogCreatorHeading"
import Button from "../../../components/button/Button"
import BlogCreatorLayout from "./components/BlogCreatorLayout"
import { FullScreenCreator } from "./containers/FullScreenCreator"
import { useEditor } from "../../logic/useEditor"
import { BlogCreatorAlertsProvider } from "./providers/BlogCreatorAlertsProvider"
import { useAnalytics } from "../../../utils/useAnalytics"
import { BlogPreview } from "./containers/BlogPreview"
import { EditableSnippet } from "../../../ui/snippet/EditableSnippet"
import { ErrorsSection } from "./containers/ErrorsSection"
import { Toolbox } from "./containers/Toolbox"
import { BlogCreatorPageModel } from "../../core/models"
import Layout from "../../containers/Layout"
import { BlogCreatorJumbo } from "./components/BlogCreatorJumbo"

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  @media ${T_DOWN} {
    flex-flow: column;
  }
`

const CodeContainer = styled.div`
  width: 48%;

  @media ${T_DOWN} {
    width: 100%;
  }
`

const PreviewScroll = styled.div`
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

const BlogCreatorView = () => {
  const creator = useBlogCreatorPageProvider()

  const { track } = useAnalytics()
  const { isOpen, open, close } = useModal()
  const [
    { currentMdx, mdx, hasErrors, changed },
    { change, markAsBroken },
  ] = useEditor(creator.samples.default)
  const [loading, setLoading] = useState(false)

  const ref = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    setLoading(true)
    track({ name: "full_screen_clicked" })
    document.body.style.overflow = "hidden"
    ref.current = setTimeout(open, 1500)
  }

  useLeavePageAlert({
    text: creator.t.leave_warn,
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
    <Layout>
      <BlogCreatorJumbo />
    </Layout>
  )

  // return (
  //   <>
  //     <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
  //       {creator.t.sentence}
  //     </h1>

  //     {loading && (
  //       <BlogCreatorLoader
  //         onClose={() => {
  //           document.body.style.overflow = "auto"
  //           setLoading(false)
  //         }}
  //       />
  //     )}

  //     {isOpen ? (
  //       <BlogCreatorAlertsProvider>
  //         <FullScreenCreator onClose={close}>
  //           {Editor}
  //           <>
  //             {Errors}
  //             {Preview}
  //           </>
  //           <Toolbox code={mdx} onFormat={change} />
  //         </FullScreenCreator>
  //       </BlogCreatorAlertsProvider>
  //     ) : (
  //       <BlogCreatorLayout>
  //         <Heading>
  //           <BlogCreatorHeading
  //             buttons={
  //               <Button className="full-mode-btn" onClick={handleOpen}>
  //                 {creator.t.full_screen}
  //               </Button>
  //             }
  //           />
  //         </Heading>
  //         <Container>
  //           <CodeContainer className="col">{Editor}</CodeContainer>
  //           <PreviewScroll className="col">
  //             {Errors}
  //             {Preview}
  //           </PreviewScroll>
  //         </Container>
  //       </BlogCreatorLayout>
  //     )}
  //   </>
  // )
}

export { BlogCreatorView }
