import React, { ReactNode } from "react"
import styled from "styled-components"

const Container = styled.main`
  position: relative;
  margin: 0 auto;
`

interface LayoutProps {
  footer: ReactNode
  children: ReactNode
  navigation: ReactNode
}

const Layout = ({ footer, children, navigation }) => {
  return (
    <Container className="col ui-layout">
      {navigation}
      {children}
      {footer}
    </Container>
  )
}

export type { LayoutProps }

export { Layout }
