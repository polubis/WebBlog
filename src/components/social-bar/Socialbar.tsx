import React, { ReactNode } from "react"
import styled from "styled-components"

import { DiscordIcon, IconButton, LinkedinIcon } from "../../ui"
import { useScroll } from "../../utils/useScroll"
import theme from "../../utils/theme"

const Container = styled.div`
  position: fixed;
  bottom: 44px;
  left: 20px;
  z-index: 103;
  transition: 0.3s transform ease-in-out;

  & > * {
    display: block;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14);
  }

  & > *:not(:last-child) {
    margin-bottom: 12px;
  }

  &.visible {
    transform: scale(1);
  }

  &.hidden {
    transform: scale(0);
  }

  svg {
    path {
      fill: ${theme.black} !important;
      z-index: 1;
    }
  }
`

interface SocialBarProps {
  scrollToTopNode: ReactNode
}

const SocialBar = ({ scrollToTopNode }: SocialBarProps) => {
  const { offsetY, direction } = useScroll({ strategy: "throttle" })

  return (
    <Container
      className={direction === "up" && offsetY > 150 ? "visible" : "hidden"}
    >
      <a
        className="icon-link"
        href="https://discord.gg/PxXQayT3x3"
        title="GreenOn Software Discord channel"
        target="_blank"
      >
        <IconButton>
          <DiscordIcon />
        </IconButton>
      </a>
      <a
        href="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"
        title="Linkedin GreenOn Software profile"
        target="_blank"
      >
        <IconButton>
          <LinkedinIcon />
        </IconButton>
      </a>
      {scrollToTopNode}
    </Container>
  )
}

export { SocialBar }
