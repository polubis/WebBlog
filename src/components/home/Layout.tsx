import React, { ReactNode } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  padding-top: 100px;
  flex-flow: column;
`

const Main = styled.main``

export const Layout = ({
  navigation,
  main,
}: {
  navigation: ReactNode
  main: ReactNode
}) => {
  return (
    <Container>
      {navigation}
      <Main>{main}</Main>
    </Container>
  )
}
