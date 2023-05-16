import React from "react"

import { L_DOWN } from "../../utils/viewport"
import styled from "styled-components"
import { useScroll } from "../../utils/useScroll"
import { ArrowLeftIcon, IconButton } from "../../ui"
import theme from "../../utils/theme"

interface ScrollUpButtonProps {
  onClick: () => void
}

const VISIBILITY_LIMIT = 500

const Container = styled.div`
  position: fixed;
  bottom: 40px;
  z-index: 103;
  transition: 0.3s all ease-in-out;

  @media ${L_DOWN} {
    left: 20px;
  }

  &.visible {
    transform: scale(1);
    opacity: 1;
  }

  &.hidden {
    transform: scale(0);
    opacity: 0;
  }

  button {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14);
  }

  svg {
    transform: rotate(90deg);

    path {
      fill: ${theme.black};
    }
  }
`

export const ScrollUpButton = ({ onClick }: ScrollUpButtonProps) => {
  const { offsetY, direction } = useScroll()

  return (
    <Container
      className={
        direction === "up" && offsetY > VISIBILITY_LIMIT ? "visible" : "hidden"
      }
    >
      <IconButton onClick={onClick}>
        <ArrowLeftIcon />
      </IconButton>
    </Container>
  )
}
