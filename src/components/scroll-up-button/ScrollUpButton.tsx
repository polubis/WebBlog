import React, { FC } from "react"

import Button from "../button/Button"
import { L_DOWN } from "../../utils/viewport"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"
import { useScroll } from "../../utils/useScroll"

interface ScrollUpButtonProps {
  onClick: () => void
}

const VISIBILITY_LIMIT = 500

const show = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${theme.black};

  @media ${L_DOWN} {
    left: 20px;
    right: auto;
  }

  .scrollUp-show {
    animation: ${show} 0.4s ease-in-out 0s forwards;
  }

  .scrollUp-hide {
    display: none;
  }
`

export const ScrollUpButton: FC<ScrollUpButtonProps> = ({ onClick }) => {
  const { offsetY } = useScroll()

  return (
    <Container>
      <Button
        className={`${
          offsetY > VISIBILITY_LIMIT ? "scrollUp-show" : "scrollUp-hide"
        }`}
        onClick={onClick}
      >
        Go up
      </Button>
    </Container>
  )
}
