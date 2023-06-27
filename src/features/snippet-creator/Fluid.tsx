import React, { ReactNode } from "react"
import styled from "styled-components"

const Footer = styled.div`
  display: flex;
  height: 40px;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  ${Footer} {
    margin-top: 40px;
  }
`

interface FluidProps {
  children: ReactNode
  footer?: ReactNode
}

const Fluid = ({ children, footer }: FluidProps) => {
  return (
    <Container>
      {children}
      {footer && <Footer>{footer}</Footer>}
    </Container>
  )
}

export { Fluid }
