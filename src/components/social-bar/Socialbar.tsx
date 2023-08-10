import React from "react"
import styled from "styled-components"

import { DiscordIcon, IconButton, LinkedinIcon } from "../../ui"
import { useScroll } from "../../utils/useScroll"
import theme from "../../utils/theme"
import { ScrollUpButton } from "../scroll-up-button/ScrollUpButton"
import { useLayoutProvider } from "../../v2/providers/LayoutProvider"
import { FacebookIcon } from "../../ui/icons/FacebookIcon"

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

  svg path {
    fill: ${theme.black};
  }
`

const SocialBar = () => {
  const layout = useLayoutProvider()
  const { offsetY, direction } = useScroll({ strategy: "throttle" })

  return (
    <Container
      className={direction === "up" && offsetY > 150 ? "visible" : "hidden"}
    >
      <a
        href={layout.discord_url}
        title={layout.t.discord_channel}
        target="_blank"
      >
        <IconButton>
          <DiscordIcon />
        </IconButton>
      </a>
      <a
        href={layout.fb_url}
        title={layout.t.fb_profile}
        target="_blank"
      >
        <IconButton>
          <FacebookIcon />
        </IconButton>
      </a>
      <a
        href={layout.linkedin_url}
        title={layout.t.linkedin_profile}
        target="_blank"
      >
        <IconButton>
          <LinkedinIcon />
        </IconButton>
      </a>
      <ScrollUpButton
        onClick={() => window.scrollTo({ top: 0 })}
      />
    </Container>
  )
}

export { SocialBar }
