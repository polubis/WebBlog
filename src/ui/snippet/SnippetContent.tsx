import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import styled from "styled-components"
import { useCopyToClipboard } from "../../utils/useCopyToClipboard"
import { S } from "../text"
import { SNIPPET_THEME } from "./snippetTheme"
import { InteractiveButton } from "./InteractiveButton"

const Wrapper = styled.div`
  max-width: calc(100vw - 56px);
`

const Container = styled.div`
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
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"],
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
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

const Footer = styled.footer`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  padding-top: 4px;

  & > * {
    margin: 8px 8px 0 0;

    &:last-child {
      margin: 8px 0 0 0;
    }
  }
`

interface SnippetContentProps {
  children: string
  description?: string
}

const useContentCopy = (children: SnippetContentProps["children"]) => {
  const { copy } = useCopyToClipboard()

  const handleCopy = (): void => {
    copy(children.trim())
  }

  return { copy: handleCopy }
}

const SnippetContent = ({ children, description }: SnippetContentProps) => {
  const { copy } = useContentCopy(children)

  return (
    <Container className="ui-snippet">
      <Wrapper className="ui-snippet-code">
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
      </Wrapper>

      {description && <S italic>{description}</S>}

      <Footer>
        <InteractiveButton onClick={copy}>
          {status => (status === "pending" ? <>✂️ Copied</> : <>✂️ Copy</>)}
        </InteractiveButton>
        {/* <FeedbackButton>👍</FeedbackButton>
          <FeedbackButton>👎</FeedbackButton>
          <FeedbackButton>🐛 Doesn't work</FeedbackButton>
          <FeedbackButton>💬 Feedback</FeedbackButton> */}
      </Footer>
    </Container>
  )
}

export type { SnippetContentProps }

export { SnippetContent }
