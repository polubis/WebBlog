import React, { memo } from "react"
import PrismSnippet, { defaultProps, PrismTheme } from "prism-react-renderer"
import styled from "styled-components"
import type { PreProps } from "./models"
import { S } from "../../../ui"
import { pre_config } from "./consts"

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

const Container = styled.div`
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
    }

    .line-number {
      display: table-cell;
      text-align: right;
      padding-right: 12px;
      user-select: none;
      opacity: 0.5;
      position: relative;

      &::after {
        position: absolute;
      }
    }

    .line-content {
      display: table-cell;
    }
  }

  .description {
    margin-top: 4px;
  }
`

const Pre = memo(
  ({ children, lang = "javascript", linesOff, description }: PreProps) => {
    return (
      <Container className="ui-snippet">
        <PrismSnippet
          {...defaultProps}
          theme={SNIPPET_THEME}
          code={children}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {linesOff
                ? tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      <div className="line-content">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    </div>
                  ))
                : tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      <div className="line-number">{i + 1}</div>
                      <div className="line-content">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    </div>
                  ))}
            </pre>
          )}
        </PrismSnippet>
        {description && (
          <S className="description" italic>
            {description}
          </S>
        )}
      </Container>
    )
  }
)

export { Pre }
