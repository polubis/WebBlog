import React, { ReactNode, RefObject } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  margin: 0 auto;
`

interface LayoutProps {
  footer: ReactNode
  children: ReactNode
  navigation: ReactNode
  ref?: RefObject<HTMLDivElement>
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ footer, children, navigation }, ref) => {
    return (
      <Container ref={ref} className="ui-layout col">
        {navigation}
        {children}
        {footer}
      </Container>
    )
  }
)

export type { LayoutProps }

export { Layout }
