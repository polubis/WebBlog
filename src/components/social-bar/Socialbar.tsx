import React from "react"
import styled from "styled-components"

import { useScroll } from "../../utils/useScroll"
import theme from "../../utils/theme"
import { ArrowLeftIcon } from "../../ui"

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 103;

  svg path {
    fill: ${theme.black};
  }

  svg {
    transform: rotate(90deg);
  }
`

const SocialBar = () => {
  const { direction } = useScroll({ strategy: "throttle" })

  return direction === "up" || direction === "idle" ? (
    <Container>
      <button
        className="icon-button secondary medium rectangle"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <ArrowLeftIcon />
      </button>
    </Container>
  ) : null
}

export { SocialBar }
