import React from "react"
import PrismSnippet, { defaultProps } from "prism-react-renderer"
import styled from "styled-components"
import { useClipboard } from "../../utils/useClipboard"
import { S } from "../text"
import { SNIPPET_THEME } from "./snippetTheme"
import { InteractiveButton } from "./InteractiveButton"
import { SnippetProps, Range, Highlightable, HighlightStatus } from "./defs"

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

const Pre = styled.pre`
  text-align: left;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

const Line = styled.div<Highlightable>`
  display: table-row;
  background: ${props => {
    switch (props.status) {
      case "added":
        return "rgba(0, 255, 0, 0.1)"
      case "deleted":
        return "rgba(250, 36, 36, 0.2)"
      case "changed":
        return "rgba(255, 255, 0, 0.1)"
      default:
        return "transparent"
    }
  }};
`

const LineNo = styled.span<Highlightable>`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;

  &::after {
    position: absolute;
    margin-left: 0.2em;

    content: "${props => {
      switch (props.status) {
        case "added":
          return "+"
        case "deleted":
          return "-"
        case "changed":
          return "•"
        default:
          return ""
      }
    }}";
  }
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
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  & > * {
    margin: 0 8px 8px 0;

    &:last-child {
      margin: 0 0 8px 0;
    }
  }
`

const flatRange = (range: Range): number[] => {
  const flattenedRange = range.reduce<number[]>((acc, item) => {
    const tuple = Array.isArray(item) ? item : [item]

    if (tuple.some(value => value <= 0)) {
      throw Error("Less than 1 are not allowed")
    }

    const isRange = tuple.length === 2

    if (isRange) {
      const [first, second] = tuple

      if (first > second) {
        throw Error("First value cannot be greater than second one")
      }

      for (let i = first; i <= second; i++) {
        acc.push(i)
      }
    }

    return acc
  }, [])

  return flattenedRange
}

const StaticSnippet = ({
  children,
  description,
  src,
  added = [],
  deleted = [],
  changed = [],
}: SnippetProps) => {
  const { copy } = useClipboard()

  const handleCopy = (): void => {
    copy(children!.trim())
  }

  const handleOpenSource = (): void => {
    window.open(src, "_blank")
  }

  const getHighlightStatus = (idx: number): HighlightStatus => {
    const line = idx + 1

    if (flatRange(added).includes(line)) {
      return "added"
    }

    if (flatRange(deleted).includes(line)) {
      return "deleted"
    }

    if (flatRange(changed).includes(line)) {
      return "changed"
    }

    return ""
  }

  return (
    <Container className="ui-snippet">
      <Header>
        {src && (
          <InteractiveButton onClick={handleOpenSource}>
            {status =>
              status === "pending" ? <>🔗 Opening</> : <>🔗 Source</>
            }
          </InteractiveButton>
        )}
        <InteractiveButton onClick={handleCopy}>
          {status => (status === "pending" ? <>✂️ Copied</> : <>✂️ Copy</>)}
        </InteractiveButton>
      </Header>

      <PrismSnippet
        {...defaultProps}
        theme={SNIPPET_THEME}
        code={children!.trim()}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => {
              const status = getHighlightStatus(i)

              return (
                <Line
                  status={status}
                  key={i}
                  {...getLineProps({ line, key: i })}
                >
                  <LineNo status={status}>{i + 1}</LineNo>
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

      {description && <S italic>{description}</S>}
    </Container>
  )
}

export { StaticSnippet }
