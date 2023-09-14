import React from "react"
import PrismSnippet, { defaultProps, PrismTheme } from "prism-react-renderer"
import styled, { keyframes } from "styled-components"
import type { HighlightStatus, PreProps, Range } from "./models"
import { S } from "../../../ui"
import { pre_config } from "./consts"
import { useClipboard } from "../../../utils/useClipboard"

const SNIPPET_THEME: PrismTheme = {
  plain: { color: "#fff", backgroundColor: "#282a36" },
  styles: [
    {
      types: ["changed"],
      style: { color: "rgb(162, 191, 252)", fontStyle: "italic" },
    },
    {
      types: ["deleted"],
      style: { color: "rgba(239, 83, 80, 0.56)", fontStyle: "italic" },
    },
    {
      types: ["inserted", "attr-name"],
      style: { color: "rgb(173, 219, 103)", fontStyle: "italic" },
    },
    {
      types: ["comment"],
      style: { color: "rgb(99, 119, 119)", fontStyle: "italic" },
    },
    { types: ["string", "url"], style: { color: "rgb(173, 219, 103)" } },
    { types: ["variable"], style: { color: "rgb(214, 222, 235)" } },
    { types: ["number"], style: { color: "rgb(247, 140, 108)" } },
    {
      types: ["builtin", "char", "constant", "function"],
      style: { color: "rgb(130, 170, 255)" },
    },
    { types: ["punctuation"], style: { color: "rgb(199, 146, 234)" } },
    {
      types: ["selector", "doctype"],
      style: { color: "rgb(199, 146, 234)", fontStyle: "italic" },
    },
    { types: ["class-name"], style: { color: "rgb(255, 203, 139)" } },
    {
      types: ["tag", "operator", "keyword"],
      style: { color: "rgb(127, 219, 202)" },
    },
    { types: ["boolean"], style: { color: "rgb(255, 88, 116)" } },
    { types: ["property"], style: { color: "rgb(128, 203, 196)" } },
    { types: ["namespace"], style: { color: "rgb(178, 204, 214)" } },
  ],
}

const animateFragments = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled.div`
  &.animated {
    & .token-line {
      * {
        animation: ${animateFragments} 1s ease-in-out 0s forwards;
        opacity: 0;
      }
    }
  }

  pre {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 16px;
    text-align: left;
    overflow-x: auto;
    padding: ${pre_config.padding_top}px 12px ${pre_config.padding_bot}px 12px;
    white-space: pre;
    word-spacing: normal;
    margin: 0;
    word-break: normal;
    border-radius: 4px;
    word-wrap: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    .token-line {
      display: table-row;
      height: ${pre_config.line_height}px;

      &.changed {
        background: #383838;
      }

      &.added {
        background: rgba(0, 255, 0, 0.1);
      }

      &.deleted {
        background: rgba(250, 36, 36, 0.2);
      }
    }

    .line-number {
      display: table-cell;
      text-align: right;
      padding-right: 12px;
      user-select: none;
      opacity: 0.5;
    }

    .line-content {
      display: table-cell;
    }
  }

  .description {
    display: block;
    transform: translateY(-${(pre_config.estimated_scroll_size / 2) - 2}px);
    background: #000;
    height: ${pre_config.description_height}px;
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

const Pre = ({
  children,
  lang = "javascript",
  linesOff,
  description,
  added = [],
  changed = [],
  deleted = [],
  animated,
  Header,
  Footer,
  height,
}: PreProps) => {
  const { copy } = useClipboard()
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
    <Container className={`ui-snippet${animated ? " animated" : ""}`}>
      {Header && Header({ copy: () => copy(children) })}
      <div style={{ height }}>
        <PrismSnippet
          {...defaultProps}
          theme={SNIPPET_THEME}
          code={children}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {linesOff
                ? tokens.map((line, i) => {
                    const status = getHighlightStatus(i)

                    return (
                      <div
                        key={i}
                        {...getLineProps({ line, className: status, key: i })}
                      >
                        <div className="line-content">
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })
                : tokens.map((line, i) => {
                    const status = getHighlightStatus(i)

                    return (
                      <div
                        key={i}
                        {...getLineProps({ line, className: status, key: i })}
                      >
                        <div className="line-number">{i + 1}</div>
                        <div className="line-content">
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
            </pre>
          )}
        </PrismSnippet>
      </div>
      {Footer && Footer({ copy: () => copy(children) })}
      {description && (
        <S title={description} className="description truncated" italic>
          {description}
        </S>
      )}
    </Container>
  )
}

export { Pre }
