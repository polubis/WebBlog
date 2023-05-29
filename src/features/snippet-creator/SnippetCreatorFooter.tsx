import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const SnippetCreatorFooter = ({ children }) => {
  return <Container className={"visible"}>{children}</Container>
}

export { SnippetCreatorFooter }
