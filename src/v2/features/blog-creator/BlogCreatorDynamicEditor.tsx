import React, { useLayoutEffect } from "react"
import { EditableSnippet } from "../../../ui/snippet/EditableSnippet"
import { useEditor } from "../../logic/useEditor"
import { useBlogCreatorPageProvider } from "./BlogCreatorPageProvider"
import { BlogPreview } from "./containers/BlogPreview"
import { ErrorsSection } from "./containers/ErrorsSection"
import { FullScreenCreator } from "./containers/FullScreenCreator"
import { Toolbox } from "./containers/Toolbox"
import { BlogCreatorAlertsProvider } from "./providers/BlogCreatorAlertsProvider"
import { useLeavePageAlert } from "../../../utils/useLeavePageAlert"
import { useAnalytics } from "../../../utils/useAnalytics"
import { BlogCreatorHeading } from "./containers/BlogCreatorHeading"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { CloseIcon } from "../../../ui"

const BlogCreatorPageDynamicEditor = ({ onClose }: { onClose: () => void }) => {
  const { track } = useAnalytics()
  const layout = useLayoutProvider()
  const creator = useBlogCreatorPageProvider()

  const [
    { currentMdx, mdx, hasErrors, changed },
    { change, markAsBroken },
  ] = useEditor(creator.samples.default)

  useLeavePageAlert({
    text: creator.t.leave_warn,
    active: changed,
  })

  useLayoutEffect(() => {
    track({ name: "full_screen_clicked" })
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  {
    /* <EditableSnippet value={mdx} onChange={change} />
        <>
          {hasErrors ? <ErrorsSection /> : null}
          <BlogPreview mdx={currentMdx} onError={markAsBroken} />
        </>
        <Toolbox code={mdx} onFormat={change} /> */
  }

  return (
    <BlogCreatorAlertsProvider>
      <FullScreenCreator
        header={
          <BlogCreatorHeading
            buttons={
              <>
                <button
                  className="icon-button secondary small"
                  onClick={onClose}
                >
                  <span>
                    <CloseIcon />
                  </span>
                </button>
                {/* <button className="full-mode-btn button primary upper">
                      Tutorial
                    </button> */}
              </>
            }
          />
        }
      />
    </BlogCreatorAlertsProvider>
  )
}

export default BlogCreatorPageDynamicEditor
