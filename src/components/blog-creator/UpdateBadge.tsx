import React from "react"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"
import Badge from "../article/Badge"

const animateIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2020;
  width: 100px;

  & > * {
    will-change: transform;
    animation: ${animateIn} 0.2s cubic-bezier(0, 1.38, 0.83, 0.67) forwards;
  }
`

const UpdateBadge = () => {
  return (
    <Wrapper>
      <Badge color={theme.primary} background={theme.grayC}>
        Updating... Take it easy :D
      </Badge>
    </Wrapper>
  )
}

export { UpdateBadge }
