import React, { ReactNode } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding-top: 100px;
`

interface LayoutProps {
  footer: ReactNode
  children: ReactNode
  navigation: ReactNode
}

const Layout = ({ footer, children, navigation }: LayoutProps) => {
  return (
    <Container className="ui-layout">
      {navigation}
      {children}
      {footer}
    </Container>
  )
}

export type { LayoutProps }

export { Layout }
