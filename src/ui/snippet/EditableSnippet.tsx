import React, { ReactNode } from "react"

import Editor from "react-simple-code-editor"
import Highlight, { defaultProps } from "prism-react-renderer"
import { SNIPPET_THEME } from "./snippetTheme"
import styled from "styled-components"

const styles = {
  root: SNIPPET_THEME.plain,
}

const EditorWrapper = styled.div`
  .ui-editable-snippet {
    overflow: unset !important;
    pre {
      padding-left: 65px !important;
    }
    textarea {
      outline: none;
      padding-left: 65px !important;
    }
    .editor-line-number {
      position: absolute;
      left: 0px;
      color: #444444;
      text-align: right;
      width: 50px;
      font-weight: 100;
      font-style: italic;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`

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
          <div className="editor-line-wrapper">
            <span className="editor-line-number">{i + 1}</span>
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <>
                  <span {...getTokenProps({ token, key })} />
                </>
              ))}
            </div>
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
    <EditorWrapper>
      <Editor
        className="ui-editable-snippet"
        value={value}
        onValueChange={onChange}
        highlight={highlight}
        padding={10}
        style={styles.root}
      />
    </EditorWrapper>
  )
}

export { EditableSnippet }
