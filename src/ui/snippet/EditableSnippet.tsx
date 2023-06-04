import React from "react"

import Editor from "react-simple-code-editor"
import Highlight, { Language, defaultProps } from "prism-react-renderer"
import { SNIPPET_THEME } from "./snippetTheme"
import styled from "styled-components"

const styles = {
  root: SNIPPET_THEME.plain,
}

const EditorWrapper = styled.div`
  .ui-editable-snippet {
    overflow: unset !important;

    pre {
      padding-left: 44px !important;
    }

    textarea {
      outline: none;
      padding-left: 44px !important;
    }

    .editor-line-number {
      position: absolute;
      left: 0px;
      opacity: 0.5;
      padding: 0 4px;
      width: 36px;
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      text-align: right;
    }
  }
`

interface EditableSnippetProps {
  value: string
  language?: Language
  onChange: (value: string) => void
}

const EditableSnippet = ({
  language = "markup",
  value,
  onChange,
}: EditableSnippetProps) => {
  return (
    <EditorWrapper>
      <Editor
        className="ui-editable-snippet"
        value={value}
        onValueChange={onChange}
        highlight={code => (
          <Highlight
            {...defaultProps}
            theme={SNIPPET_THEME}
            code={code}
            language={language}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <>
                {tokens.map((line, i) => (
                  <div key={i} className="editor-line-wrapper">
                    <span className="editor-line-number">{i + 1}</span>
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </Highlight>
        )}
        padding={10}
        style={styles.root}
      />
    </EditorWrapper>
  )
}

export { EditableSnippet }
