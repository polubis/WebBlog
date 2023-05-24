import React from "react"
import PrismSnippet, { defaultProps } from "prism-react-renderer"
import styled, { keyframes } from "styled-components"
import { SNIPPET_THEME } from "./snippetTheme"
import { CodeProps } from "./defs"

const Container = styled.div`
  max-width: 100vw;

  .prism-code {
    margin: 0;
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
    border-radius: 4px;
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

const animateFragments = keyframes`
  from {
    opacity: 0;
    padding-left: 8px;
  }
  to {
    opacity: 1;
    padding-left: 0;
  }
`

const Pre = styled.pre`
  text-align: left;
  padding: 0.5em;
  overflow: scroll;

  &.animated {
    & .token-line {
      * {
        animation: ${animateFragments} 0.4s ease-in-out 0s forwards;
        opacity: 0;
      }
    }
  }

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

  &::after {
    position: absolute;
    margin-left: 0.2em;
  }
`

const LineContent = styled.span`
  display: table-cell;
`

const Code = ({
  className = "",
  children,
  header,
  footer,
  animated,
  language = "jsx",
}: CodeProps) => {
  const animateClassName = animated ? " animated" : ""

  return (
    <Container className={`ui-snippet${className ? " " + className : ""}`}>
      {header}
      <PrismSnippet
        {...defaultProps}
        theme={SNIPPET_THEME}
        code={children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={`${className}${animateClassName}`} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })

              return (
                <Line key={i} {...lineProps}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              )
            })}
          </Pre>
        )}
      </PrismSnippet>
      {footer}
    </Container>
  )
}

export { Code }
