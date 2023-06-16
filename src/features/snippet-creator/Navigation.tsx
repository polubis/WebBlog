import styled from "styled-components"
import { T_DOWN } from "../../utils/viewport"
import theme from "../../utils/theme"
import React, { ReactNode } from "react"

const Container = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  overflow-x: auto;
  padding: 12px 20px 12px 20px;
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
  return <Container>{children}</Container>
}
