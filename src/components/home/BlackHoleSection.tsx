import React from "react"
import styled from "styled-components"
import { Content, Huge } from "../../ui"
import theme from "../../utils/theme"
import { M_DOWN } from "../../utils/viewport"
import Loadable from "react-loadable"

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  position: relative;
  overflow: hidden;

  ${Huge} {
    max-width: 300px;
    text-align: center;
    text-shadow: -6px 11px 15px ${theme.black};
    z-index: 1;

    @media ${M_DOWN} {
      font-size: 48px;
    }
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(/hole.png);
`

const BlackHoleWrapper = Loadable({
  loader: () => import("./BlackHoleWrapper").then(m => m.BlackHoleWrapper),
  loading: () => null,
})

const BlackHoleSection = () => {
  return (
    <Wrapper>
      <Content>
        <Container>
          <Huge>Cosmic dose of knowledge</Huge>
          <BlackHoleWrapper />
        </Container>
      </Content>
    </Wrapper>
  )
}

export { BlackHoleSection }
