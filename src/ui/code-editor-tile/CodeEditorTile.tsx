import React, { ReactNode } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"

const Dot = styled.div`
  border-radius: 50%;
  width: 16px;
  height: 16px;
`

const Container = styled.div`
  display: flex;
  z-index: 1;
  flex-flow: column;
  border-radius: 2px;
  width: 100%;
`

const Header = styled.header`
  background: #565656;
  padding: 20px 24px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: ${theme.blackA};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

const ThreeDots = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 16px;
  }

  & > *:nth-child(1) {
    background: #00ff38;
  }

  & > *:nth-child(2) {
    background: #ffd200;
  }

  & > *:nth-child(3) {
    background: #30404b;
  }
`

export interface CodeEditorProps {
  children: ReactNode
  header?: (dots: ReactNode) => ReactNode
}

export const CodeEditorTile = ({
  children,
  header = dots => dots,
}: CodeEditorProps) => {
  const dots = (
    <ThreeDots>
      <Dot />
      <Dot />
      <Dot />
    </ThreeDots>
  )

  return (
    <Container className="ui-code-editor-tile">
      <Header className="header">{header(dots)}</Header>
      <Content className="content">{children}</Content>
    </Container>
  )
}
