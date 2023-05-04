import React from "react"
import { EditableSnippet } from "../ui"
import Button from "../components/button/Button"
import { useEditor } from "../components/blog-creator/useEditor"
import { Link } from "gatsby"

export default function (): React.ReactElement {
  const [{ currentMdx }, { change }] = useEditor({
    initMdx: `import PrismSnippet, { defaultProps } from "prism-react-renderer";

    const UsageOfPrism = () => {
      return (
        <PrismSnippet
          {...defaultProps}
          code={"import React from 'react'"}
          language="jsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>{/* JSX code goes here... */}</>
          )}
        </PrismSnippet>
      );
    };`,
  })

  return (
    <>
      <EditableSnippet value={currentMdx} onChange={change} />
      <Link to={`/snippets-preview/?code=${encodeURIComponent(currentMdx)}`}>
        <Button>Share</Button>
      </Link>
    </>
  )
}
