import React from "react"
import styled from "styled-components"
import { useClipboard } from "../../utils/useClipboard"
import { S } from "../text"
import { SNIPPET_THEME } from "./snippetTheme"
import { InteractiveButton } from "./InteractiveButton"
import { SnippetProps } from "./defs"
import { Code } from "./Code"

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

const Description = styled.div`
  padding-top: 4px;
`

const StaticSnippet = ({ children, description, src }: SnippetProps) => {
  const { copy } = useClipboard()

  const handleCopy = (): void => {
    copy(children!.trim())
  }

  const handleOpenSource = (): void => {
    window.open(src, "_blank")
  }

  return (
    <Code
      className="static-snippet"
      header={
        <Header className="static-snippet-header">
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
      }
      footer={
        description && (
          <Description className="static-snippet-description">
            <S italic>{description}</S>
          </Description>
        )
      }
    >
      {children!.trim()}
    </Code>
  )
}

export { StaticSnippet }
