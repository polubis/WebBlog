import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import styled from "styled-components"
import { useClipboard } from "../../utils/useClipboard"
import { S } from "../text"
import { SNIPPET_THEME } from "./snippetTheme"
import { InteractiveButton } from "./InteractiveButton"

const Container = styled.div`
  max-width: 100vw;

  .prism-code {
    margin: 0;
  }

  ${S} {
    margin-top: 4px;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  code[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection,
  pre[class*="language-"] ::-moz-selection,
  pre[class*="language-"]::-moz-selection {
    text-shadow: none;
  }
  code[class*="language-"] ::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"] ::selection,
  pre[class*="language-"]::selection {
    text-shadow: none;
  }
  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"],
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 2px;
    white-space: normal;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  code:focus {
    outline: none;
  }
`

const Pre = styled.pre`
  text-align: left;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span`
  display: table-cell;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: wrap;
  background: ${SNIPPET_THEME.plain.backgroundColor};
  padding: 12px 12px 0 12px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  & > * {
    margin: 0 8px 8px 0;

    &:last-child {
      margin: 0 0 8px 0;
    }
  }
`

interface SnippetContentProps {
  children: string
  description?: string
}

const SnippetContent = ({ children, description }: SnippetContentProps) => {
  const { copy } = useClipboard()

  const handleCopy = (): void => {
    copy(children.trim())
  }

  return (
    <Container className="ui-snippet">
      <Header>
        <InteractiveButton onClick={handleCopy}>
          {status => (status === "pending" ? <>✂️ Copied</> : <>✂️ Copy</>)}
        </InteractiveButton>
        {/* <FeedbackButton>👍</FeedbackButton>
          <FeedbackButton>👎</FeedbackButton>
          <FeedbackButton>🐛 Doesn't work</FeedbackButton>
          <FeedbackButton>💬 Feedback</FeedbackButton> */}
      </Header>

      <Highlight
        {...defaultProps}
        theme={SNIPPET_THEME}
        code={children.trim()}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>

      {description && <S italic>{description}</S>}
    </Container>
  )
}

export type { SnippetContentProps }

export { SnippetContent }
