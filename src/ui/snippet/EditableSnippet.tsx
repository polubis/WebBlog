import React, { ReactNode } from "react"

import Editor from "react-simple-code-editor"
import Highlight, { defaultProps } from "prism-react-renderer"
import { SNIPPET_THEME } from "./snippetTheme"

const styles = {
  root: SNIPPET_THEME.plain,
}

const highlight = (code: string): ReactNode => (
  <Highlight
    {...defaultProps}
    theme={SNIPPET_THEME}
    code={code}
    language="markup"
  >
    {({ tokens, getLineProps, getTokenProps }) => (
      <>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <>
                <span className="editorLineNumber">{i + 1}</span>
                <span {...getTokenProps({ token, key })}/>
              </>
            ))}
          </div>
        ))}
      </>
    )}
  </Highlight>
)

interface EditableSnippetProps {
  value: string
  onChange: (value: string) => void
}

const EditableSnippet = ({ value, onChange }: EditableSnippetProps) => {
  return (
    <Editor
      className="ui-editable-snippet"
      value={value}
      onValueChange={onChange}
      highlight={highlight}
      padding={10}
      style={styles.root}
    />
  )
}

export { EditableSnippet }
