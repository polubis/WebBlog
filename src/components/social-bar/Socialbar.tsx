import React from "react"
import styled from "styled-components"

import { DiscordIcon, IconButton, LinkedinIcon } from "../../ui"
import theme from "../../utils/theme"
import { ScrollUpButton } from "../scroll-up-button/ScrollUpButton"
import { useLayoutProvider } from "../../v2/providers/LayoutProvider"
import { FacebookIcon } from "../../ui/icons/FacebookIcon"

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 103;

  & > * {
    display: block;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14);
  }

  & > *:not(:last-child) {
    margin-bottom: 12px;
  }

  svg path {
    fill: ${theme.black};
  }
`

const SocialBar = () => {
  const layout = useLayoutProvider()

  return (
    <Container>
      <a
        href={layout.discord_url}
        title={layout.t.discord_channel}
        target="_blank"
      >
        <IconButton>
          <DiscordIcon />
        </IconButton>
      </a>
      <a href={layout.fb_url} title={layout.t.fb_profile} target="_blank">
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
      <ScrollUpButton onClick={() => window.scrollTo({ top: 0 })} />
    </Container>
  )
}

export { SocialBar }
