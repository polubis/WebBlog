import React from "react"
import { EditableSnippet } from "../../../ui/snippet/EditableSnippet"
import { useEditor } from "../../logic/useEditor"
import { useBlogCreatorPageProvider } from "./BlogCreatorPageProvider"
import { BlogPreview } from "./containers/BlogPreview"
import { ErrorsSection } from "./containers/ErrorsSection"
import { FullScreenCreator } from "./containers/FullScreenCreator"
import { Toolbox } from "./containers/Toolbox"
import { BlogCreatorAlertsProvider } from "./providers/BlogCreatorAlertsProvider"
import { useLeavePageAlert } from "../../../utils/useLeavePageAlert"

const BlogCreatorPageDynamicEditor = ({ onClose }: { onClose: () => void }) => {
  const creator = useBlogCreatorPageProvider()

  const [
    { currentMdx, mdx, hasErrors, changed },
    { change, markAsBroken },
  ] = useEditor(creator.samples.default)

  useLeavePageAlert({
    text: creator.t.leave_warn,
    active: changed,
  })

  return (
    <BlogCreatorAlertsProvider>
      <FullScreenCreator onClose={onClose}>
        <EditableSnippet value={mdx} onChange={change} />
        <>
          {hasErrors ? <ErrorsSection /> : null}
          <BlogPreview mdx={currentMdx} onError={markAsBroken} />
        </>
        <Toolbox code={mdx} onFormat={change} />
      </FullScreenCreator>
    </BlogCreatorAlertsProvider>
  )
}

export default BlogCreatorPageDynamicEditor
