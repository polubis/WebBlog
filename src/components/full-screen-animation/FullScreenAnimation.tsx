import React, { ReactNode } from "react"
import styled, { css, keyframes } from "styled-components"
import theme from "../../utils/theme"

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }`

const Container = styled.div<{ animated: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  background: ${theme.black};
  z-index: 129;

  ${props =>
    props.animated &&
    css`
      animation: ${scaleIn} 0.4s ease-in-out forwards;
    `}

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

interface FullScreenAnimation {
  children: ReactNode
  animated?: boolean;
}

const FullScreenAnimation = ({ children, animated = true }: FullScreenAnimation) => {
  return <Container animated={animated}>{children}</Container>
}

export { FullScreenAnimation }
