import React, { useState } from "react"

import Button from "../button/Button"
import { L_DOWN } from "../../utils/viewport"
import { SCROLL_UP } from "./ScrollUpButton.constants"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"

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

export const ScrollUpButton = () => {
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0)
  const { stepUpValue, timeInMiliseconds, visibilityLimit } = SCROLL_UP

  window.addEventListener("scroll", () => {
    setCurrentScrollPosition(document.documentElement.scrollTop)
  })

  const handleScrollUp = () => {
    let newPosition = currentScrollPosition

    const scrollInterval = setInterval(() => {
      document.documentElement.scrollTo(0, (newPosition -= stepUpValue))

      if (newPosition <= 0) {
        clearInterval(scrollInterval)
        setCurrentScrollPosition(0)
      }
    }, timeInMiliseconds)
  }

  return (
    <Container>
      <Button
        className={`${
          currentScrollPosition > visibilityLimit
            ? "scrollUp-show"
            : "scrollUp-hide"
        }`}
        onClick={handleScrollUp}
      >
        Go up
      </Button>
    </Container>
  )
}
