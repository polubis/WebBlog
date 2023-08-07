import React from "react"
import styled, { keyframes } from "styled-components"
import type { AsideProps } from "./models"
import theme from "../../../../utils/theme"

const slideInFromRight = keyframes`
  from {
    transform: translateX(300px);
  }
  to {
    transform: translateX(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  padding: 20px;
  overflow-y: auto;
  right: 0;
  background: black;
  border-left: 1px solid ${theme.grayC};
  top: 0;
  width: 300px;
  z-index: 120;
  animation: 0.2s ${slideInFromRight} ease-in-out forwards;
`

export const Aside = ({ children }: AsideProps) => {
  return <Container className="col">{children}</Container>
}
