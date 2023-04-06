import React from "react"
import styled, { keyframes } from "styled-components"
import { Content, Huge } from "../../ui"
import theme from "../../utils/theme"
import { M_DOWN } from "../../utils/viewport"
import Loadable from "react-loadable"
import { Image } from "../../models"
import GatsbyImage from "gatsby-image"

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
`

const BlackHoleWrapper = Loadable({
  loader: () => import("./BlackHoleWrapper").then(m => m.BlackHoleWrapper),
  loading: () => null,
})

interface BlackHoleSectionProps {
  holeImg: Image
}

const BlackHoleSection = ({ holeImg }: BlackHoleSectionProps) => {
  return (
    <Wrapper>
      <GatsbyImage
        className="components-black-hole-section-image"
        fluid={holeImg}
        alt="Black hole"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Content>
        <Container>
          <Huge>Cosmic dose of knowledge</Huge>
          <BlackHoleWrapper />
        </Container>
      </Content>
    </Wrapper>
  )
}

export type { BlackHoleSectionProps }

export { BlackHoleSection }
