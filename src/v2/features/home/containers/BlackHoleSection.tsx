import React from "react"
import styled, { keyframes } from "styled-components"
import Loadable from "react-loadable"
import Image from "gatsby-image"
import { useHomePageProvider } from "../HomePageProvider"
import { Content, DiscordIcon, Huge, LinkedinIcon } from "../../../../ui"
import theme from "../../../../utils/theme"
import { M_DOWN } from "../../../../utils/viewport"
import { YtIcon } from "../../../../ui/icons/YtIcon"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { FacebookIcon } from "../../../../ui/icons/FacebookIcon"

const animateIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  position: relative;
  overflow: hidden;

  canvas {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: ${animateIn} 0.4s ease-in-out 0s forwards;
  }

  ${Huge} {
    display: flex;
    justify-content: center;
    max-width: 300px;
    text-align: center;
    text-shadow: -6px 11px 15px ${theme.black};
    z-index: 1;

    @media ${M_DOWN} {
      font-size: 48px;
    }
  }
`

const Wrapper = styled.div`
  position: relative;

  .black-hole-socials-section {
    justify-content: flex-end;
    z-index: 1;
    position: absolute;
    bottom: 20px;
    right: 20px;

    & > *:not(:last-child) {
      margin-right: 20px;
    }

    svg {
      width: 32px;
      height: 32px;
    }

    a svg path {
      fill: #fff;
    }
  }
`

const BlackHoleWrapper = Loadable({
  loader: () => import("./BlackHoleWrapper").then(m => m.BlackHoleWrapper),
  loading: () => null,
})

const imageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}

const BlackHoleSection = () => {
  const home = useHomePageProvider()
  const layout = useLayoutProvider()

  return (
    <Wrapper>
      <Image
        loading="eager"
        fluid={home.thumbnail}
        alt={home.t.sentence}
        style={imageStyle}
      />
      <Content>
        <Container>
          <Huge>{home.t.sentence}</Huge>
          <BlackHoleWrapper />
        </Container>
      </Content>
      <div className="black-hole-socials-section row">
        <a href={layout.yt_channel} title={layout.t.yt_channel} target="_blank">
          <YtIcon />
        </a>
        <a
          href={layout.discord_url}
          title={layout.t.discord_channel}
          target="_blank"
        >
          <DiscordIcon />
        </a>
        <a
          href={layout.linkedin_url}
          title={layout.t.linkedin_profile}
          target="_blank"
        >
          <LinkedinIcon />
        </a>
        <a href={layout.fb_url} title={layout.t.fb_profile} target="_blank">
          <FacebookIcon />
        </a>
      </div>
    </Wrapper>
  )
}

export { BlackHoleSection }
