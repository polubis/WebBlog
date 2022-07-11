import React from "react"
import styled from "styled-components"
import { XXL } from "../../ui"

const Container = styled.section`
  display: flex;
  flex-flow: column;

  ${XXL} {
    margin: 172px 0 128px 172px;
  }
`

export const AuthorsSection = () => {
  return (
    <Container>
      <XXL>Top ninjas</XXL>
    </Container>
  )
}
