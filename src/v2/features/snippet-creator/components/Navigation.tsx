import styled from "styled-components"
import { T_DOWN } from "../../../../utils/viewport"
import theme from "../../../../utils/theme"
import React, { ReactNode } from "react"

const Container = styled.nav`
  position: fixed;
  z-index: 1;
  bottom: 0;
  transform: translateX(-20px);
  width: 100%;
  border-top: 1px solid ${theme.grayC};
  background: ${theme.bg};

  @media ${T_DOWN} {
    left: 0;
    right: 0;
    transform: unset;
    justify-content: center;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  overflow-x: auto;

  & > * {
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`

interface NavigationProps {
  children: ReactNode
}

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}
