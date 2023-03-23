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
  footer
}: {
  navigation: ReactNode
  main: ReactNode
  footer?: ReactNode
}) => {
  return (
    <Container>
      {navigation}
      <Main>{main}</Main>
      {footer}
    </Container>
  )
}
